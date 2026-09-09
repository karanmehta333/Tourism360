from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    image_url = Column(String(1000), nullable=True)
    category = Column(String(100), nullable=True)  