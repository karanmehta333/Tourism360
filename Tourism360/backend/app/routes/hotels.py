from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.hotel import Hotel
from app.schemas.hotel import HotelCreate

router = APIRouter(
    prefix="/api/hotels",
    tags=["Hotels"]
)

@router.post("/")
def create_hotel(
    hotel: HotelCreate,
    db: Session = Depends(get_db)
):
    new_hotel = Hotel(
        name=hotel.name,
        location=hotel.location,
        city=hotel.city,
        price=hotel.price,
        currency=hotel.currency,
        rating=hotel.rating,
        facilities=hotel.facilities,
        available_rooms=hotel.available_rooms,
        source=hotel.source,
        image_url=hotel.image_url,
        hotel_url=hotel.hotel_url
    )

    db.add(new_hotel)
    db.commit()
    db.refresh(new_hotel)

    return new_hotel

@router.get("/")
def get_hotels(
    city: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Hotel)

    if city:
        query = query.filter(Hotel.city.ilike(city))

    return query.all()