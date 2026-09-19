# Architecture

```text
Host / guest browser
        |
   Next.js UI ---- fixture fallback (static Pages demo only)
        |
 POST /v1/assessments
        |
 FastAPI validation -> deterministic score -> plan response
        |                       |
 PostgreSQL (future)      gear/source adapters (future)
        |
 guide refresh worker -> ephemeris + weather -> reviewed nightly guide
```

The prototype deliberately duplicates the small scoring formula in TypeScript so GitHub Pages remains interactive without claiming a deployed backend. Python is the canonical production candidate and is contract-tested for happy, degraded, and invalid inputs. A production client must show source timestamps and a visible degraded state when weather, ephemeris, light-pollution, or gear feeds fail; cached facts may be served only inside a declared freshness window.

Security posture: exact coordinates are sensitive; public guides use coarse location. Validate enums and numeric bounds at the API, escape host-authored fields, allowlist outbound sources, keep affiliate redirects server-side, rate-limit assessments, and log plan versions without guest PII.
