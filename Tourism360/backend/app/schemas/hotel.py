from pydantic import BaseModel

class HotelCreate(BaseModel):
    name: str
    location: str
    city: str = ""
    price: float
    currency: str = "INR"
    rating: float = 0
    facilities: str = ""
    available_rooms: int = 0
    source: str = "manual"
    image_url: str = ""
    hotel_url: str = ""