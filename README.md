# NightNest

NightNest is a runnable prototype for turning a rural short-term rental's dark sky into a guest-ready amenity. The Next.js frontend scores a property, recommends and customizes a gear kit, estimates a clearly labeled illustrative upside, and previews a date-specific guest guide. The Python/FastAPI service implements the same transparent assessment as a tested domain operation.

## Run locally

```bash
npm ci
npm run typecheck
npm run test:e2e
npm run build
cd api && uv sync --frozen && uv run pytest
```

Start the frontend with `npm run dev`. Run the API with `cd api && uv run uvicorn main:app --reload`; `POST /v1/assessments` accepts property name, Bortle class, open-horizon percentage, viewing surface, nightly rate, and occupancy.

## Deployment boundary

GitHub Pages serves the static frontend under the repository base path. FastAPI is runnable and tested source only; it is **not publicly deployed**. All property names, sky events, equipment prices, scores, and economics are fictional or illustrative. The demo uses no paid API, account, live weather, maps, purchasing, or booking.

## Product documents

- [Office Hours diagnostic](docs/OFFICE_HOURS.md)
- [Product plan](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [CEO review](docs/CEO_REVIEW.md)
- [Phased build prompts](docs/BUILD_PROMPTS.md)
- [Source notes](research/notes.md)
