from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="NightNest Sky Assessment API", version="0.1.0")

Surface = Literal["deck", "patio", "yard", "balcony"]


class AssessmentRequest(BaseModel):
    property_name: str = Field(min_length=2, max_length=80)
    bortle_class: int = Field(ge=1, le=9)
    horizon_percent: int = Field(ge=20, le=100)
    outdoor_area: Surface
    nightly_rate: int = Field(ge=50, le=5000)
    occupancy_percent: int = Field(ge=10, le=100)


class KitRecommendation(BaseModel):
    id: str
    name: str
    budget: int
    rationale: str


class Assessment(BaseModel):
    score: int
    tier: Literal["Promising", "Strong", "Signature"]
    darkness_points: int
    horizon_points: int
    readiness_points: int
    kit: KitRecommendation
    projected_monthly_upside: int
    placement_note: str
    cautions: list[str]


def assess_property(request: AssessmentRequest) -> Assessment:
    """Score a property and return a right-sized amenity plan with transparent math."""
    darkness = round((10 - request.bortle_class) / 9 * 50)
    horizon = round(request.horizon_percent / 100 * 30)
    surface_points = {"deck": 20, "patio": 18, "yard": 16, "balcony": 10}[request.outdoor_area]
    score = min(100, darkness + horizon + surface_points)

    if score >= 86:
        tier, kit = "Signature", KitRecommendation(id="premium", name="Signature observatory", budget=2380, rationale="Exceptional darkness and sightlines justify a destination-grade setup.")
    elif score >= 72:
        tier, kit = "Strong", KitRecommendation(id="guided", name="Hosted sky deck", budget=1128, rationale="Strong viewing supports a smart telescope and comfortable guided setup.")
    else:
        tier, kit = "Promising", KitRecommendation(id="starter", name="Guest-ready starter", budget=486, rationale="Start with durable, low-complexity gear while validating guest demand.")

    booked_nights = 30 * request.occupancy_percent / 100
    rate_lift = 0.04 if score < 72 else 0.07 if score < 86 else 0.10
    upside = round(booked_nights * request.nightly_rate * rate_lift)
    placement = {
        "deck": "Use the darkest deck corner; keep path lights below eye level and point the viewing zone south.",
        "patio": "Create a marked no-white-light zone on the far edge of the patio.",
        "yard": "Choose firm ground with the widest southern horizon and add a lockable weatherproof bin.",
        "balcony": "Use binoculars only; secure all equipment and preserve the building's egress path.",
    }[request.outdoor_area]
    cautions = []
    if request.bortle_class >= 6:
        cautions.append("Light pollution limits faint-object viewing; market moon and planet sessions instead.")
    if request.horizon_percent < 50:
        cautions.append("Obstructed sightlines reduce viewing windows; verify placement before buying equipment.")
    if request.outdoor_area == "balcony":
        cautions.append("Confirm railing height, wind exposure, and house rules before guest use.")
    if not cautions:
        cautions.append("Confirm local weather, wildfire, wildlife, and quiet-hour guidance before launch.")

    return Assessment(score=score, tier=tier, darkness_points=darkness, horizon_points=horizon, readiness_points=surface_points, kit=kit, projected_monthly_upside=upside, placement_note=placement, cautions=cautions)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/v1/assessments", response_model=Assessment)
def create_assessment(request: AssessmentRequest) -> Assessment:
    return assess_property(request)
