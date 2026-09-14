from __future__ import annotations

import argparse
import json
from pathlib import Path

from .pipeline import Candidate, run_scout


ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "fixtures"


def _load_candidates(path: Path) -> list[Candidate]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return [Candidate(**item) for item in data]


def _load_history(path: Path) -> list[dict[str, object]]:
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the Toolglass Scout pipeline")
    parser.add_argument("--demo", action="store_true", help="run the deterministic judge-friendly fixture")
    parser.add_argument("--input", type=Path, help="candidate JSON file")
    parser.add_argument("--history", type=Path, help="history JSON file")
    parser.add_argument("--bedrock", action="store_true", help="use Amazon Bedrock for stage observations")
    parser.add_argument("--json", action="store_true", dest="as_json", help="print machine-readable output")
    args = parser.parse_args()

    if not args.demo and not args.input:
        parser.error("use --demo or provide --input")
    candidates_path = args.input or FIXTURES / "demo_candidates.json"
    history_path = args.history or FIXTURES / "history.json"
    result = run_scout(
        _load_candidates(candidates_path),
        _load_history(history_path),
        model_mode="bedrock" if args.bedrock else "offline",
    )
    if args.as_json:
        print(json.dumps(result.to_dict(), indent=2, sort_keys=True))
        return

    print("TOOLGLASS SCOUT - bounded Strands Agents pipeline")
    print(f"Model path: {result.model_mode} (offline is deterministic and credential-free)")
    print("\nDecisions:")
    for decision in result.decisions:
        print(f"- {decision['title']}: {decision['status']}")
        for reason in decision.get("reasons", []):
            print(f"  reason: {reason}")
    print("\nHuman decision surface:")
    for decision in result.decisions:
        if decision["status"] == "HUMAN_REVIEW":
            print(f"- {decision['title']} -> {', '.join(decision['human_options'])}")
    print("\nTrace stages: " + " -> ".join(item["stage"] for item in result.trace))
