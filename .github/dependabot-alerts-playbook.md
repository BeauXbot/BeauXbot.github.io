# Dependabot Alerts Playbook

## 1) Alert triage priority

1. Process `Critical/High` first, then `Medium/Low`.
2. Prioritize alerts that are exploitable, runtime-impacting, or internet-facing.
3. Prioritize `direct` dependencies before `transitive` dependencies.

## 2) Preferred remediation order

1. Merge low-risk Dependabot patch/minor PRs when CI is green.
2. For high-risk alerts, upgrade directly to the fixed upstream version first.
3. If upgrade is blocked, apply compensating controls (feature disable, validation, access control, WAF) and track a deadline to remove the temporary mitigation.

## 3) Weekly governance cadence

- Run dependency updates weekly by ecosystem batches.
- Keep batch size small to reduce blast radius.
- Require full CI checks (build + security workflows) before merge.

## 4) Short-term risk acceptance process

For any alert that cannot be fixed immediately, create or update a tracking issue with:

- Alert ID / package / affected version
- Risk acceptance reason
- Business impact scope
- Temporary mitigation
- Owner
- Target remediation date

Do not accept risk indefinitely; review accepted risks at least every 30 days.

## 5) Backlog prevention guardrails

- Dependabot security + version updates remain enabled.
- Auto-merge is limited to low-risk patch/minor Dependabot updates.
- PRs that introduce high/critical vulnerable dependencies are blocked by dependency review checks.
