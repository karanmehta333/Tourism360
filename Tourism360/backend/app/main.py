from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth import router as auth_router
from app.routes.hotels import router as hotel_router
from app.routes.destinations import router as destination_router

app = FastAPI(
    title="Tourism360 API",
    description="Backend API for Tourism360",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    auth_router,
    tags=["Authentication"]
)

app.include_router(
    hotel_router
)

app.include_router(
    destination_router
)

@app.get("/")
def root():
    return {
        "message": "Tourism360 API is running",
        "status": "success"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }