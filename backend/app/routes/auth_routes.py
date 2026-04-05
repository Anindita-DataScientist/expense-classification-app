from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import hash_password, verify_password
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.utils import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {"message": "Email already registered"}

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
        },
    }


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        return {"message": "User not found"}

    if not verify_password(user.password, existing_user.password_hash):
        return {"message": "Invalid password"}

    return {
        "message": "Login successful",
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
        },
    }