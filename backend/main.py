from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.home import router as home_router
from app.routes.transaction_routes import router as transaction_router
from app.routes.upload_routes import router as upload_router

from app.database import Base, engine
from app.models import User, Transaction

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # temporary for deploy
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(transaction_router)