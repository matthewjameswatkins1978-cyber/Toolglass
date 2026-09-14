from toolglass_scout.pipeline import Candidate, canonical_url, run_scout


def candidate(identifier: str, url: str, *, evidence=True, score=0.9) -> Candidate:
    return Candidate(
        id=identifier,
        title=identifier.title(),
        summary="A concise candidate summary.",
        source_url=url,
        evidence=[{"source_type": "repo", "url": url, "claim": "Primary source claim."}] if evidence else [],
        fit_scores={key: score for key in ("novelty", "usefulness", "technical_interest", "evidence_quality", "reader_interest")},
    )


def test_canonical_url_removes_trailing_slash_and_fragment():
    assert canonical_url("HTTPS://Example.com/tool/?x=1#fragment") == "https://example.com/tool?x=1"


def test_survivor_reaches_human_review_with_draft():
    result = run_scout([candidate("survivor", "https://example.com/survivor")])
    assert result.decisions[0]["status"] == "HUMAN_REVIEW"
    assert result.decisions[0]["draft"]["headline"] == "Show & Tell: Survivor"
    assert result.decisions[0]["human_options"] == ["APPROVE", "REJECT", "INVESTIGATE", "HOLD"]


def test_duplicate_is_rejected_before_fit_and_drafting():
    result = run_scout(
        [candidate("duplicate", "https://example.com/already/")],
        [{"source_url": "https://example.com/already", "status": "published"}],
    )
    assert result.decisions[0]["status"] == "REJECT"
    assert "history" in result.decisions[0]["reasons"][0]


def test_missing_evidence_is_rejected_without_draft():
    result = run_scout([candidate("unverified", "https://example.com/unverified", evidence=False)])
    assert result.decisions[0]["status"] == "REJECT"
    assert "evidence" in " ".join(result.decisions[0]["reasons"])
    assert not any("draft" in decision for decision in result.decisions)


def test_low_fit_is_held_after_verification():
    result = run_scout([candidate("weak-fit", "https://example.com/weak-fit", score=0.6)])
    assert result.decisions[0]["status"] == "HOLD"
