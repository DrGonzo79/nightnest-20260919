from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def payload(**overrides: object) -> dict[str, object]:
    base: dict[str, object] = {"property_name": "Blue Ridge Cabin", "bortle_class": 3, "horizon_percent": 82, "outdoor_area": "deck", "nightly_rate": 265, "occupancy_percent": 71}
    return base | overrides


def test_health() -> None:
    assert client.get("/health").json() == {"status": "ok"}


def test_assessment_returns_transparent_score_and_plan() -> None:
    response = client.post("/v1/assessments", json=payload())
    assert response.status_code == 200
    body = response.json()
    assert body["score"] == body["darkness_points"] + body["horizon_points"] + body["readiness_points"]
    assert body["tier"] == "Strong"
    assert body["kit"]["id"] == "guided"
    assert body["projected_monthly_upside"] > 0


def test_bright_balcony_gets_starter_and_specific_cautions() -> None:
    response = client.post("/v1/assessments", json=payload(bortle_class=8, horizon_percent=44, outdoor_area="balcony"))
    assert response.status_code == 200
    body = response.json()
    assert body["kit"]["id"] == "starter"
    assert len(body["cautions"]) == 3


def test_invalid_bortle_class_is_rejected() -> None:
    assert client.post("/v1/assessments", json=payload(bortle_class=10)).status_code == 422


def test_empty_name_is_rejected() -> None:
    assert client.post("/v1/assessments", json=payload(property_name="")).status_code == 422


def test_unknown_surface_is_rejected() -> None:
    assert client.post("/v1/assessments", json=payload(outdoor_area="roof")).status_code == 422
