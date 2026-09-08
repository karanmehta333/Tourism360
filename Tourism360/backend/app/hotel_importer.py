import os
import requests
from dotenv import load_dotenv
from app.database import SessionLocal
from app.models.hotel import Hotel

load_dotenv()

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

DESTINATIONS = [
    "Almora",
    "Nainital",
    "Munsiyari",
    "Pithoragarh",
    "Bhimtal",
    "Mukteshwar",
    "Bageshwar",
    "Dharchula",
    "Ranikhet",
    "Lansdowne",
    "Rishikesh",
    "Haridwar",
    "Mussoorie"
]

def get_price(hotel):
    try:
        rate = hotel.get("rate_per_night", {})

        if isinstance(rate, dict):
            value = rate.get("extracted_lowest")

            if value is not None:
                return float(value)

            value = rate.get("lowest")

            if value is not None:
                value = str(value)
                value = value.replace("$", "")
                value = value.replace("₹", "")
                value = value.replace(",", "")
                return float(value)

        return 0.0

    except Exception:
        return 0.0

def get_facilities(hotel):
    amenities = hotel.get("amenities", [])

    if isinstance(amenities, list):
        return ", ".join(str(item) for item in amenities)

    return ""

def get_image_url(hotel):
    images = hotel.get("images", [])

    if isinstance(images, list) and images:
        first_image = images[0]

        if isinstance(first_image, dict):
            return first_image.get("original_image", "")

    return ""

def import_destination(city):
    params = {
        "engine": "google_hotels",
        "q": f"hotels in {city}, Uttarakhand",
        "check_in_date": "2026-09-09",
        "check_out_date": "2026-09-10",
        "adults": 2,
        "children": 0,
        "currency": "INR",
        "gl": "in",
        "hl": "en",
        "api_key": SERPAPI_KEY
    }

    print("")
    print("==============================")
    print("Searching:", city)
    print("==============================")

    try:
        response = requests.get(
            "https://serpapi.com/search",
            params=params,
            timeout=30
        )
    except Exception as e:
        print("Request error:", e)
        return 0, 0

    print("Status:", response.status_code)

    if response.status_code != 200:
        print(response.text)
        return 0, 0

    data = response.json()
    hotels = data.get("properties", [])

    print("Hotels found:", len(hotels))

    db = SessionLocal()

    added = 0
    updated = 0

    try:
        for hotel in hotels:
            name = hotel.get("name")

            if not name:
                continue

            price = get_price(hotel)
            rating = hotel.get("overall_rating", 0)
            facilities = get_facilities(hotel)
            image_url = get_image_url(hotel)
            hotel_url = hotel.get("link", "")

            existing = (
                db.query(Hotel)
                .filter(Hotel.name == name)
                .first()
            )

            if existing:
                existing.location = city
                existing.city = city
                existing.price = price
                existing.currency = "INR"
                existing.rating = rating
                existing.facilities = facilities
                existing.source = "serpapi"
                existing.image_url = image_url
                existing.hotel_url = hotel_url

                updated += 1

                print(
                    "Updated:",
                    name,
                    "| City:",
                    city,
                    "| ₹" + str(price),
                    "| Rating:",
                    rating
                )

            else:
                new_hotel = Hotel(
                    name=name,
                    location=city,
                    city=city,
                    price=price,
                    currency="INR",
                    rating=rating,
                    facilities=facilities,
                    available_rooms=0,
                    source="serpapi",
                    image_url=image_url,
                    hotel_url=hotel_url
                )

                db.add(new_hotel)

                added += 1

                print(
                    "Added:",
                    name,
                    "| City:",
                    city,
                    "| ₹" + str(price),
                    "| Rating:",
                    rating
                )

        db.commit()

    except Exception as e:
        db.rollback()
        print("Import error:", e)

    finally:
        db.close()

    return added, updated

def import_hotels():
    if not SERPAPI_KEY:
        print("SERPAPI_KEY is missing")
        return

    total_added = 0
    total_updated = 0

    for city in DESTINATIONS:
        added, updated = import_destination(city)

        total_added += added
        total_updated += updated

    print("")
    print("==============================")
    print("HOTEL IMPORT COMPLETED")
    print("==============================")
    print("Total Added:", total_added)
    print("Total Updated:", total_updated)
    print("==============================")

if __name__ == "__main__":
    import_hotels()