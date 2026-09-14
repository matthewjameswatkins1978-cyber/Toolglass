# Toolglass Scout architecture

The diagram in `architecture.png` describes the working local demo and marks the
AWS boundary honestly:

1. Candidate discovery is demo-fed JSON input.
2. Strands Agents runs bounded stage agents for verification, editorial fit and drafting.
3. Verification requires inspectable HTTP(S) evidence and claims.
4. Canonical source URLs are checked against local history for deduplication.
5. The explicit editorial-fit gate scores novelty, usefulness, technical interest,
   evidence quality and likely reader interest.
6. Weak candidates are rejected or held with reasons. Survivors receive an evidence
   packet and draft, then stop at a human editor decision surface.

Amazon Bedrock is an optional model provider selected with `--bedrock`; the normal
demo is deterministic and credential-free. AgentCore and durable AWS storage are
the target deployment shape, not a claim that this offline repository run is already
deployed there.
