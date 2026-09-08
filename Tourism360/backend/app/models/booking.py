from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base


class Booking(Base):

    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    hotel_id = Column(
        Integer,
        ForeignKey("hotels.id")
    )

    check_in = Column(String(20))

    check_out = Column(String(20))

    status = Column(
        String(30),
        default="confirmed"
    )