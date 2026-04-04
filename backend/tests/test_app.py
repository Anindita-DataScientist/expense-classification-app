import os
import sys

from fastapi.testclient import TestClient

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Backend is running successfully"}


def test_dashboard_summary():
    response = client.get("/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_transactions" in data
    assert "category_summary" in data


def test_login_user_not_found():
    response = client.post(
        "/auth/login",
        json={
            "email": "notfound@test.com",
            "password": "123456",
        },
    )
    assert response.status_code == 200
    assert response.json()["message"] == "User not found"