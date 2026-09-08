from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.destination import Destination
from app.schemas.destination import DestinationCreate, DestinationResponse

router = APIRouter(
    prefix="/api/destinations",
    tags=["Destinations"]
)

@router.post("/", response_model=DestinationResponse)
def create_destination(
    destination: DestinationCreate,
    db: Session = Depends(get_db)
):
    new_destination = Destination(
        name=destination.name,
        city=destination.city,
        description=destination.description,
        image_url=destination.image_url,
        category=destination.category
    )

    db.add(new_destination)
    db.commit()
    db.refresh(new_destination)

    return new_destination

@router.get("/", response_model=list[DestinationResponse])
def get_destinations(
    db: Session = Depends(get_db)
):
    return db.query(Destination).order_by(Destination.name).all()

@router.get("/search", response_model=list[DestinationResponse])
def search_destinations(
    q: str = Query(..., min_length=1),
    db: Session = Depends(get_db)
):
    search = f"%{q}%"

    return db.query(Destination).filter(
        (Destination.name.ilike(search)) |
        (Destination.city.ilike(search)) |
        (Destination.category.ilike(search))
    ).order_by(Destination.name).all()

@router.get("/category/{category}", response_model=list[DestinationResponse])
def get_destinations_by_category(
    category: str,
    db: Session = Depends(get_db)
):
    return db.query(Destination).filter(
        Destination.category.ilike(category)
    ).order_by(Destination.name).all()

@router.get("/city/{city}", response_model=list[DestinationResponse])
def get_destinations_by_city(
    city: str,
    db: Session = Depends(get_db)
):
    destinations = db.query(Destination).filter(
        Destination.city.ilike(city)
    ).order_by(Destination.name).all()

    if not destinations:
        raise HTTPException(
            status_code=404,
            detail=f"No destinations found for {city}"
        )

    return destinations

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(
    destination_id: int,
    db: Session = Depends(get_db)
):
    destination = db.query(Destination).filter(
        Destination.id == destination_id
    ).first()

    if not destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found"
        )

    return destination

@router.put("/{destination_id}", response_model=DestinationResponse)
def update_destination(
    destination_id: int,
    destination_data: DestinationCreate,
    db: Session = Depends(get_db)
):
    destination = db.query(Destination).filter(
        Destination.id == destination_id
    ).first()

    if not destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found"
        )

    destination.name = destination_data.name
    destination.city = destination_data.city
    destination.description = destination_data.description
    destination.image_url = destination_data.image_url
    destination.category = destination_data.category

    db.commit()
    db.refresh(destination)

    return destination

@router.delete("/{destination_id}")
def delete_destination(
    destination_id: int,
    db: Session = Depends(get_db)
):
    destination = db.query(Destination).filter(
        Destination.id == destination_id
    ).first()

    if not destination:
        raise HTTPException(
            status_code=404,
            detail="Destination not found"
        )

    db.delete(destination)
    db.commit()

    return {
        "message": "Destination deleted successfully",
        "id": destination_id
    }