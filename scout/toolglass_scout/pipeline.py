"""The bounded Toolglass Scout pipeline.

The pipeline is deliberately explicit: discovery data is treated as input, each
gate leaves a trace, and drafting is impossible until verification, history and
editorial-fit gates pass. Strands Agents supplies the agent loop at every stage.
The default offline provider is deterministic so judges can run the demo without
credentials; ``SCOUT_MODEL=bedrock`` switches the same stage agents to Amazon
Bedrock when AWS access is available.
"""

from __future__ import annotations

import asyncio
import json
import os
from dataclasses import asdict, dataclass, field
from typing import Any, AsyncGenerator, Iterable
from urllib.parse import urlsplit, urlunsplit

from strands import Agent
from strands.models import Model


@dataclass(frozen=True)
class Candidate:
    id: str
    title: str
    summary: str
    source_url: str
    evidence: list[dict[str, Any]]
    fit_scores: dict[str, float]
    tags: list[str] = field(default_factory=list)


@dataclass
class ScoutResult:
    decisions: list[dict[str, Any]]
    history: list[dict[str, Any]]
    trace: list[dict[str, Any]]
    model_mode: str

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


class OfflineModel(Model):
    """A deterministic Strands model provider for repeatable judge demos.

    This is not a fake pipeline: the real Strands ``Agent`` loop invokes this
    provider. It supplies stable stage observations when no model credentials
    are available, while the Bedrock provider remains selectable for live use.
    """

    def __init__(self, response: str):
        self.response = response
        self.config = {
            "model_id": "toolglass-scout-offline-rule-provider",
            "context_window_limit": 200_000,
        }

    def update_config(self, **model_config: Any) -> None:
        self.config.update(model_config)

    def get_config(self) -> dict[str, Any]:
        return self.config

    def structured_output(self, output_model: type[Any], prompt: Any, system_prompt: str | None = None, **kwargs: Any) -> AsyncGenerator[dict[str, Any], None]:
        async def unsupported() -> AsyncGenerator[dict[str, Any], None]:
            raise NotImplementedError("OfflineModel uses ordinary text responses")
            yield {}

        return unsupported()

    def stream(self, messages: Any, tool_specs: Any = None, system_prompt: str | None = None, **kwargs: Any) -> AsyncGenerator[dict[str, Any], None]:
        async def events() -> AsyncGenerator[dict[str, Any], None]:
            yield {"messageStart": {"role": "assistant"}}
            yield {"contentBlockDelta": {"delta": {"text": self.response}}}
            yield {"messageStop": {"stopReason": "end_turn"}}

        return events()


def canonical_url(value: str) -> str:
    parsed = urlsplit(value.strip())
    path = parsed.path.rstrip("/") or "/"
    return urlunsplit((parsed.scheme.lower(), parsed.netloc.lower(), path, parsed.query, ""))


def _agent_note(stage: str, candidate: Candidate, mode: str) -> str:
    payload = {
        "stage": stage,
        "candidate": candidate.id,
        "mode": mode,
        "instruction": "Leave an auditable observation; do not publish.",
    }
    if mode == "offline":
        model: Model = OfflineModel(json.dumps(payload, sort_keys=True))
    else:
        from strands.models import BedrockModel

        model = BedrockModel(
            model_id=os.getenv("SCOUT_BEDROCK_MODEL", "global.anthropic.claude-sonnet-4-6"),
            region_name=os.getenv("AWS_REGION", "us-west-2"),
            temperature=0.0,
        )
    agent = Agent(
        model=model,
        name=f"Toolglass Scout {stage.title()} Agent",
        callback_handler=None,
        system_prompt=(
            "You are one bounded stage in Toolglass Scout. Return a concise "
            "auditable observation. Never publish, contact a source, or invent evidence."
        ),
    )
    try:
        result = agent(
            f"Stage: {stage}\nCandidate: {candidate.title}\n"
            f"Summary: {candidate.summary}\nSource: {candidate.source_url}"
        )
        return str(result)
    except Exception as exc:
        if mode == "bedrock":
            # A live provider is optional for the reproducible demo. Preserve the
            # failure in the trace and continue with explicit deterministic gates.
            return f"Bedrock unavailable; deterministic gate retained control: {type(exc).__name__}"
        raise


def _verify(candidate: Candidate) -> tuple[bool, list[str]]:
    reasons: list[str] = []
    if not candidate.source_url.startswith(("http://", "https://")):
        reasons.append("source URL is not HTTP(S)")
    if not candidate.summary.strip():
        reasons.append("candidate has no summary")
    if not candidate.evidence:
        reasons.append("no primary-source evidence packet")
    for item in candidate.evidence:
        if not item.get("url", "").startswith(("http://", "https://")):
            reasons.append("evidence item has no HTTP(S) URL")
        if not item.get("claim"):
            reasons.append("evidence item has no claim")
    return not reasons, reasons


def _fit(candidate: Candidate) -> tuple[bool, list[str]]:
    required = ("novelty", "usefulness", "technical_interest", "evidence_quality", "reader_interest")
    reasons = [f"missing fit score: {key}" for key in required if key not in candidate.fit_scores]
    reasons.extend(
        f"{key} below 0.5" for key in required if candidate.fit_scores.get(key, 0.0) < 0.5
    )
    average = sum(candidate.fit_scores.get(key, 0.0) for key in required) / len(required)
    if average < 0.7:
        reasons.append(f"editorial-fit average {average:.2f} is below 0.70")
    return not reasons, reasons


def run_scout(
    candidates: Iterable[Candidate],
    history: Iterable[dict[str, Any]] = (),
    *,
    model_mode: str = "offline",
) -> ScoutResult:
    """Run discovery input through evidence, history, fit and draft gates."""

    if model_mode not in {"offline", "bedrock"}:
        raise ValueError("model_mode must be 'offline' or 'bedrock'")

    next_history = [dict(item) for item in history]
    known_urls = {canonical_url(str(item.get("source_url", ""))) for item in next_history}
    decisions: list[dict[str, Any]] = []
    trace: list[dict[str, Any]] = []

    for candidate in candidates:
        trace.append({"stage": "discovery", "candidate": candidate.id, "status": "received"})

        verified, verification_reasons = _verify(candidate)
        note = _agent_note("verification", candidate, model_mode)
        trace.append(
            {
                "stage": "verification",
                "candidate": candidate.id,
                "status": "pass" if verified else "reject",
                "reasons": verification_reasons,
                "agent_note": note,
            }
        )
        if not verified:
            decision = {
                "candidate_id": candidate.id,
                "title": candidate.title,
                "status": "REJECT",
                "reasons": verification_reasons,
            }
            decisions.append(decision)
            next_history.append({"source_url": candidate.source_url, "status": "rejected", "title": candidate.title})
            continue

        url = canonical_url(candidate.source_url)
        duplicate = url in known_urls
        trace.append(
            {
                "stage": "dedupe/history",
                "candidate": candidate.id,
                "status": "duplicate" if duplicate else "new",
            }
        )
        if duplicate:
            decision = {
                "candidate_id": candidate.id,
                "title": candidate.title,
                "status": "REJECT",
                "reasons": ["source already exists in candidate history"],
            }
            decisions.append(decision)
            continue

        fit, fit_reasons = _fit(candidate)
        note = _agent_note("editorial-fit", candidate, model_mode)
        trace.append(
            {
                "stage": "editorial-fit",
                "candidate": candidate.id,
                "status": "pass" if fit else "hold",
                "scores": candidate.fit_scores,
                "reasons": fit_reasons,
                "agent_note": note,
            }
        )
        if not fit:
            decision = {
                "candidate_id": candidate.id,
                "title": candidate.title,
                "status": "HOLD",
                "reasons": fit_reasons,
            }
            decisions.append(decision)
            next_history.append({"source_url": candidate.source_url, "status": "held", "title": candidate.title})
            continue

        draft = {
            "headline": f"Show & Tell: {candidate.title}",
            "standfirst": candidate.summary,
            "why_it_matters": "Survived evidence, history and editorial-fit gates.",
            "evidence": candidate.evidence,
            "caveat": "Human editor must verify the packet before publication.",
        }
        note = _agent_note("drafting", candidate, model_mode)
        trace.append({"stage": "drafting", "candidate": candidate.id, "status": "created", "agent_note": note})
        decision = {
            "candidate_id": candidate.id,
            "title": candidate.title,
            "status": "HUMAN_REVIEW",
            "reasons": ["survived all autonomous gates"],
            "human_options": ["APPROVE", "REJECT", "INVESTIGATE", "HOLD"],
            "draft": draft,
        }
        decisions.append(decision)
        next_history.append({"source_url": candidate.source_url, "status": "survivor", "title": candidate.title})
        known_urls.add(url)

    trace.append(
        {
            "stage": "human-decision",
            "status": "ready",
            "message": "Only survivors reached this surface; publication is still manual.",
        }
    )
    return ScoutResult(decisions=decisions, history=next_history, trace=trace, model_mode=model_mode)
