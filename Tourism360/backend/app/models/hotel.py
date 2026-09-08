from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    city = Column(String(100), nullable=True, index=True)
    price = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    rating = Column(Float, default=0)
    facilities = Column(String(1000), default="")
    available_rooms = Column(Integer, default=0)
    source = Column(String(100), default="manual")
    image_url = Column(String(1000), nullable=True)
    hotel_url = Column(String(1000), nullable=True)