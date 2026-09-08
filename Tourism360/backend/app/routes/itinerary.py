from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.destination import Destination
from app.models.hotel import Hotel


router = APIRouter(
    prefix="/api/itinerary",
    tags=["Trip Planner"]
)


@router.get("/plan")
def create_plan(
    location: str,
    budget: float,
    days: int,
    interest: str,
    db: Session = Depends(get_db)
):

    hotels = db.query(Hotel).filter(
        Hotel.location == location,
        Hotel.price <= budget / days
    ).all()

    destinations = db.query(
        Destination
    ).filter(
        Destination.location == location,
        Destination.category == interest
    ).all()

    return {
        "location": location,
        "budget": budget,
        "days": days,
        "interest": interest,
        "recommended_hotels": hotels,
        "recommended_destinations": destinations
    }