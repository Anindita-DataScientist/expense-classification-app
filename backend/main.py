from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.routes.auth_routes import router as auth_router
from backend.app.routes.dashboard_routes import router as dashboard_router
from backend.app.routes.home import router as home_router
from backend.app.routes.transaction_routes import router as transaction_router
from backend.app.routes.upload_routes import router as upload_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home_router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(dashboard_router)
app.include_router(transaction_router)