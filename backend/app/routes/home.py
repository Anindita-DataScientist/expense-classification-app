from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def home():
    return {"message": "Backend is running successfully"}

@router.get("/api/test")
def test_api():
    return {"message": "Hello from FastAPI backend"}