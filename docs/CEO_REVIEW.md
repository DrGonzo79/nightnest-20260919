# CEO review — NightNest

Mode: **SCOPE REDUCTION**. The original idea spans consulting, commerce, SaaS, media, and marketplace. The reviewed plan strips to the smallest paid truth test while preserving a path to the ideal architecture.

## Nuclear challenge and alternatives

The customer outcome is differentiated, low-maintenance guest value—not a telescope, score, or directory. Doing nothing leaves hosts with a generic listing, but that pain is still hypothetical until paid. Current state → manual host research → paid evidence-backed audit → 12-month ideal: verified amenity operations and nightly guides across a focused operator network.

1. **Minimal viable — concierge audit (S / low):** $349 reviewed assessment and gear/placement/guest pack. Pros: tests payment, learns edge cases, no data-platform fiction. Cons: labor and subjective review. Reuses commodity sky maps and ecommerce.
2. **Selected — audit with rules workbench (M / medium):** deterministic intake/score plus human approval and guide preview. Pros: repeatable, transparent, measurable. Cons: self-reported inputs can mislead. Reuses this prototype and later source adapters.
3. **Ideal — managed amenity network (XL / high):** installation, maintenance, verified sky data, recurring guides, and referral distribution. Pros: strongest outcomes and data moat. Cons: capital, liability, operational sprawl.

**Decision:** approach 2 supports approach 1; sell concierge audits before automating feeds. Directory, fulfillment, “certification,” and booking referral are deferred.

## Review findings

1. **Architecture:** Keep score calculation as a pure domain function behind FastAPI; adapters cannot write directly to plans. Every plan is versioned and approved. Static demo duplication is accepted only for Pages and labeled. Rollback means restoring a prior approved plan, not recalculating history.
2. **Error and rescue map:** `VALIDATION_ERROR` returns field guidance; `SOURCE_UNAVAILABLE` uses a visible retry/degraded state; `STALE_DATA` shows timestamp and blocks approval; `GEOCODE_AMBIGUOUS` requests operator choice; `NO_VIEWING_EVENT` offers a moon/cloud fallback; `GEAR_ITEM_RETIRED` requires replacement review; `PAYMENT_FAILED` preserves an unpaid draft. No catch-all success response.
3. **Security and threat model:** Exact coordinates and photos can expose vacant properties. Encrypt and restrict them, use coarse public location, signed expiring asset URLs, outbound allowlists, sanitized host copy, rate limits, role checks, audit logs, dependency scanning, and no secrets in the browser.
4. **Data flow and interactions:** Intake → validate → enrich → score → human review → versioned plan → guest guide. Nil/empty/wrong-type/too-long input receives field errors; upstream timeout yields degraded draft; double-submit uses idempotency key; navigation mid-save retains draft; stale tabs receive version conflict; back button does not publish.
5. **Code quality:** Centralize thresholds and named score components, keep provider code outside domain logic, define typed error contracts, avoid generic “AI” helpers, and prevent guide prose from becoming the source of truth.
6. **Tests:** Unit-test score boundaries 1/9 and 20/100, each surface, and kit cutoffs 71/72/85/86. Contract-test provider nil/empty/error/stale paths. Integration-test plan versioning and approval. Browser-test assessment, validation, loading, empty, degraded, customization, guide switching, keyboard focus, and mobile overflow. The prototype covers the core subset.
7. **Observability:** Track assessment completion/correction, provider freshness/error, review latency, plan approval, QR opens, support minutes, implementation, replacement rate, and second-property purchase. Alert on stale guides, failed refreshes, score drift, and error-rate spikes; publish a guide-source runbook.
8. **Database/state:** Immutable assessments and plan versions; foreign keys and unique `(property_id, version)`; indexes on property/status and guide/property/date; soft-retire gear; idempotent refresh jobs. Do not collect guest identity for basic QR analytics.
9. **API:** Versioned `/v1/assessments`; strict enums/bounds; stable score breakdown and source metadata; 409 on stale version, 422 on invalid fields, 429 on abuse, 503 on required-source outage. Never return affiliate URLs from unreviewed input.
10. **Performance/scalability:** At 10×, cache source results by location/time and batch guide refreshes. At 100×, partition jobs by timezone and isolate providers with quotas/circuit breakers. Scoring is trivial; external calls, images, and nightly fan-out are bottlenecks.
11. **Design and UX:** Hierarchy is score → evidence → recommendation → economics → caution. Always label demo data and estimates. Preserve initial empty, loading, field error, upstream-degraded, and no-event states. Maintain 44px controls, keyboard focus, semantic labels, contrast, reduced motion, and no horizontal mobile overflow.

## Economics, GTM, moat, and failure modes

The strongest risk is false precision: an elegant score could create trust before evidence warrants it. The second is a weak buyer: guests enjoy stars but operators may not pay. The third is operational liability and replacement cost. GTM begins with three operators and partner referrals, not SEO traffic. The audit must sustain ~67% gross profit before recurring software. The only plausible moat is verified site and reliability data tied to guest engagement; content and gear lists are commodities.

## Accepted scope

Transparent property assessment, explicit assumptions, kit customization, guest-night preview, FastAPI domain operation, fixtures, validation/error/empty/loading states, mobile tests, CI, static deployment, and complete source/product documentation.

## Deferred / not in scope

Deferred: live maps/weather/ephemeris, accounts, payments, reviewer console, real QR analytics, PDF generation, equipment supply, affiliate commerce. Not in scope: Airbnb affiliation, dark-sky certification claims, public full-stack hosting, opaque AI scoring, booking marketplace, or revenue promises.

## Final decision

**DONE_WITH_CONCERNS:** Ship this as a validation instrument. The next irreversible decision is entering installation or fulfillment; do not make it before three paid audits reveal maintenance and liability reality.
