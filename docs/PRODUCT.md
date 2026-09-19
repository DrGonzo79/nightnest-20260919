# Product plan

## ICP, JTBD, and wedge

**ICP:** US rural STR operators with 3–25 properties, $180+ ADR, outdoor space, and shoulder-season differentiation pressure. **User:** the host who installs and maintains the amenity; the guest who scans the nightly guide. **JTBD:** “When my cabin looks interchangeable, tell me whether its sky is marketable and exactly how to offer it safely so I can increase perceived value without becoming an astronomer.” **Wedge:** a $349, 48-hour remote audit; optional $29/property/month seasonal guest guide after observed usage.

## MVP

- Structured intake: location, Bortle assumption, horizon exposure, outdoor surface, rate, occupancy, safety constraints, photos.
- Transparent 100-point score with darkness (50), horizon (30), and operational readiness (20).
- Budget-tiered equipment plan, placement note, risk flags, and removable items.
- One nightly “best thing to see” guest guide with plain-language direction and time.
- Human-review status, evidence/source timestamps, and explicit claims guardrails.

Not MVP: equipment logistics, marketplace inventory, booking commissions, AI-generated astronomy, property certification, native app, or live public backend.

## Data model

- `Property(id, operator_id, lat_bucket, lon_bucket, timezone, nightly_rate, occupancy, status)`
- `SiteAssessment(id, property_id, bortle_source, horizon_pct, surface, score, reviewer_id, evidence_at)`
- `GearItem(id, sku, category, price, durability_grade, affiliate_url, active)`
- `AmenityPlan(id, assessment_id, tier, budget, placement, version, approved_at)`
- `PlanItem(plan_id, gear_item_id, quantity, required)`
- `SkyGuide(id, property_id, local_date, event_source, viewing_window, direction, weather_status)`
- `GuestOpen(id, guide_id, opened_at, coarse_session_id)`

Version plans and scores; never silently change a purchased audit. Store coarse location publicly and exact coordinates only where required.

## Technical architecture

Next.js renders the host workflow and guest card. FastAPI owns validation and deterministic assessment logic. PostgreSQL is the eventual source of truth; a job queue refreshes sky guides and weather confidence. External adapters isolate light-pollution, ephemeris, forecast, and affiliate data. OpenTelemetry spans, structured events, and a source-freshness dashboard make degraded inputs visible. GitHub Pages currently hosts only the fixture-backed frontend.

## AI/model strategy

No LLM is needed for scoring. Deterministic rules are cheaper, explainable, and safer. A future model may rewrite reviewed guide facts into reading-level variants, but all celestial facts, timing, direction, weather, and safety statements must come from structured sources and pass schema checks. Store prompt/model version and allow reviewer override; never market simulated guidance as live AI.

## Economics

Audit price: $349. Target delivery labor: 90 minutes at $60 loaded cost; data/tooling $8; payment/support $18; gross profit about $233 (67%). A $29/month guide can target <$3 variable cost, but churn will be high unless hosts see guest opens or review mentions. Gear affiliate margin is upside, not core viability. Break-even for a host at the demo's +7% ADR assumption is not promised; measure actual rate/occupancy changes against comparable listings.

## Validation

Weeks 1–2: sell three audits and shadow intake/installation. Weeks 3–4: track implementation, QR opens, support load, and guest questions. Pass gates: 2/3 implement within 14 days; median audit delivery under 2 hours; at least two pay without a discount; one buys a second-property audit; zero unsupported marketing claims. Kill or reframe if hosts will not share site evidence or if gear maintenance dominates value.

## GTM and moat

Start through regional host managers, photographers, cleaning operators, and dark-sky tourism groups; show before/after listing assets and an evidence-backed score. Do not start with SEO directory pages. The moat can become verified property-level sky/horizon/operations data, equipment reliability outcomes, and guest engagement linked to listing performance. A generic score or content directory is copyable.

## Risks

- Weather and light pollution create disappointed guests: confidence labels and fallback activities.
- Liability, wildlife, fire, trip hazards, and optics safety: site-specific checklist and exclusions.
- Platform trademark/listing claims: avoid affiliation and unsupported certification language.
- Self-reported inputs bias scores: source timestamps plus human review.
- Gear theft/breakage: durable tiers, storage plan, replacement economics.
- Seasonality and weak causality: cohort comparisons and multi-season retention.

## 30 / 60 / 90 days

- **30:** three paid concierge audits, instrument intake corrections, installation observation, pricing interviews.
- **60:** self-serve intake plus reviewer console, versioned plans, six source adapters behind flags, ten paying properties.
- **90:** recurring guide pilot, QR analytics, partner channel test, second-property repurchase metric, go/no-go decision on managed fulfillment. Directory remains deferred.
