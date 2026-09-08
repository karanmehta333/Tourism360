from app.database import SessionLocal, engine, Base
from app.models.hotel import Hotel


Base.metadata.create_all(bind=engine)


hotels = [
    {
        "name": "Mountain View Resort",
        "location": "Mussoorie, Uttarakhand",
        "price": 3500,
        "rating": 4.5,
        "facilities": "WiFi, Parking, Breakfast, Mountain View",
        "available_rooms": 10
    },
    {
        "name": "The Naini Retreat",
        "location": "Nainital, Uttarakhand",
        "price": 5000,
        "rating": 4.4,
        "facilities": "WiFi, Restaurant, Lake View, Parking",
        "available_rooms": 8
    },
    {
        "name": "Riverside Resort",
        "location": "Rishikesh, Uttarakhand",
        "price": 4200,
        "rating": 4.6,
        "facilities": "WiFi, River View, Restaurant, Parking",
        "available_rooms": 12
    },
    {
        "name": "Himalayan Heights",
        "location": "Auli, Uttarakhand",
        "price": 6000,
        "rating": 4.7,
        "facilities": "WiFi, Mountain View, Restaurant, Hot Water",
        "available_rooms": 6
    },
    {
        "name": "Valley View Hotel",
        "location": "Dehradun, Uttarakhand",
        "price": 2800,
        "rating": 4.2,
        "facilities": "WiFi, Parking, Restaurant, Room Service",
        "available_rooms": 15
    },
    {
        "name": "Ganga View Resort",
        "location": "Haridwar, Uttarakhand",
        "price": 3200,
        "rating": 4.3,
        "facilities": "WiFi, Restaurant, River View, Parking",
        "available_rooms": 14
    },
    {
        "name": "Forest Retreat",
        "location": "Jim Corbett, Uttarakhand",
        "price": 5500,
        "rating": 4.5,
        "facilities": "WiFi, Restaurant, Swimming Pool, Parking",
        "available_rooms": 9
    },
    {
        "name": "Kedarnath Stay",
        "location": "Kedarnath, Uttarakhand",
        "price": 2500,
        "rating": 4.0,
        "facilities": "Hot Water, Food, WiFi",
        "available_rooms": 20
    },
    {
        "name": "Badrinath Mountain Hotel",
        "location": "Badrinath, Uttarakhand",
        "price": 3000,
        "rating": 4.1,
        "facilities": "Restaurant, Hot Water, Parking",
        "available_rooms": 18
    },
    {
        "name": "Lansdowne Hills Resort",
        "location": "Lansdowne, Uttarakhand",
        "price": 3800,
        "rating": 4.4,
        "facilities": "WiFi, Mountain View, Restaurant, Parking",
        "available_rooms": 11
    }
]


db = SessionLocal()

try:
    for hotel_data in hotels:

        # Prevent duplicate hotels
        existing_hotel = (
            db.query(Hotel)
            .filter(Hotel.name == hotel_data["name"])
            .first()
        )

        if existing_hotel:
            print(f"Already exists: {hotel_data['name']}")
            continue

        hotel = Hotel(**hotel_data)

        db.add(hotel)

    db.commit()

    print("Hotels seeded successfully!")

finally:
    db.close()