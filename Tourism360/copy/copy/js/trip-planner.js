const HOTEL_API = "http://127.0.0.1:8000/api/hotels/";

let allHotels = [];

const destinationData = {
    nainital: {
        name: "Nainital",
        places: ["Naini Lake", "Snow View Point", "Mall Road", "Eco Cave Gardens"],
        food: "Kumaoni Thali"
    },
    pithoragarh: {
        name: "Pithoragarh",
        places: ["Pithoragarh Fort", "Thal Kedar", "Chandak Hills", "Local Market"],
        food: "Kumaoni Thali"
    },
    bhimtal: {
        name: "Bhimtal",
        places: ["Bhimtal Lake", "Victoria Dam", "Aquarium Island", "Hidimba Parvat"],
        food: "Kumaoni Cuisine"
    },
    almora: {
        name: "Almora",
        places: ["Crank's Ridge", "Bright End Corner", "Kasar Devi Temple", "Almora Market"],
        food: "Bal Mithai"
    },
    mukteshwar: {
        name: "Mukteshwar",
        places: ["Mukteshwar Temple", "Chauli Ki Jali", "Indian Veterinary Research Institute", "Mukteshwar View Point"],
        food: "Kumaoni Cuisine"
    },
    bageshwar: {
        name: "Bageshwar",
        places: ["Bagnath Temple", "Chandika Temple", "Saryu River", "Baijnath Temple"],
        food: "Kumaoni Thali"
    },
    dharchula: {
        name: "Dharchula",
        places: ["Kali River", "Narayan Ashram", "Om Parvat View", "Local Market"],
        food: "Kumaoni Cuisine"
    },
    munsiyari: {
        name: "Munsiyari",
        places: ["Panchachuli Peaks", "Khaliya Top", "Birthi Falls", "Nanda Devi Temple"],
        food: "Kumaoni Cuisine"
    },
    haridwar: {
        name: "Haridwar",
        places: ["Har Ki Pauri", "Ganga Aarti", "Mansa Devi Temple", "Chandi Devi Temple"],
        food: "North Indian Thali"
    },
    rishikesh: {
        name: "Rishikesh",
        places: ["Laxman Jhula", "Ram Jhula", "Ganga Ghat", "Beatles Ashram"],
        food: "North Indian Cuisine"
    },
    mussoorie: {
        name: "Mussoorie",
        places: ["Mall Road", "Kempty Falls", "Gun Hill", "Lal Tibba"],
        food: "North Indian Cuisine"
    },
    lansdowne: {
        name: "Lansdowne",
        places: ["Tip N Top", "Bhulla Lake", "St. Mary's Church", "War Memorial"],
        food: "Kumaoni Cuisine"
    },
    ranikhet: {
        name: "Ranikhet",
        places: ["Chaubatia Gardens", "Jhula Devi Temple", "Majhkhali", "Golf Course"],
        food: "Kumaoni Cuisine"
    }
};

const styleDescriptions = {
    "Nature & Scenery": "Nature-focused experiences and scenic viewpoints.",
    "Adventure & Sports": "Outdoor activities and adventure experiences.",
    "Culture & Heritage": "Temples, heritage locations and local culture.",
    "Relaxation & Wellness": "Relaxed sightseeing and peaceful experiences.",
    "Family & Leisure": "Comfortable activities suitable for families.",
    "Landscape Photography": "Scenic locations ideal for photography."
};

async function loadHotels() {
    try {
        const response = await fetch(HOTEL_API);

        if (!response.ok) {
            throw new Error("Hotel API failed");
        }

        allHotels = await response.json();

        console.log("Hotels loaded:", allHotels.length);
    } catch (error) {
        console.error("Hotel loading failed:", error);
        allHotels = [];
    }
}

function getHotelsForDestination(destination) {
    const target = destination.toLowerCase().trim();

    return allHotels.filter(hotel => {
        const city = String(hotel.city || "").toLowerCase().trim();
        return city === target;
    });
}

function selectHotel(destination, budget) {
    const hotels = getHotelsForDestination(destination);

    if (!hotels.length) {
        return null;
    }

    const sorted = [...hotels].sort((a, b) => {
        return Number(b.rating || 0) - Number(a.rating || 0);
    });

    if (budget === "budget") {
        return [...hotels].sort(
            (a, b) => Number(a.price || 0) - Number(b.price || 0)
        )[0];
    }

    if (budget === "premium") {
        return [...hotels].sort(
            (a, b) => Number(b.price || 0) - Number(a.price || 0)
        )[0];
    }

    return sorted[0];
}

function getActivities(destination, style) {
    const data = destinationData[destination];

    if (!data) {
        return [];
    }

    const places = data.places;

    if (style === "Adventure & Sports") {
        return [
            `🚵 Explore ${places[0]}`,
            `🥾 Adventure around ${places[1]}`,
            `🌄 Outdoor experience near ${places[2]}`
        ];
    }

    if (style === "Culture & Heritage") {
        return [
            `🛕 Visit ${places[0]}`,
            `🏛️ Explore ${places[1]}`,
            `🙏 Discover ${places[2]}`
        ];
    }

    if (style === "Relaxation & Wellness") {
        return [
            `🌿 Relax around ${places[0]}`,
            `🌅 Enjoy the views at ${places[1]}`,
            `🧘 Spend peaceful time near ${places[2]}`
        ];
    }

    if (style === "Family & Leisure") {
        return [
            `👨‍👩‍👧 Explore ${places[0]}`,
            `🎡 Enjoy ${places[1]}`,
            `📸 Family time at ${places[2]}`
        ];
    }

    if (style === "Landscape Photography") {
        return [
            `📷 Sunrise photography at ${places[0]}`,
            `📷 Scenic photography at ${places[1]}`,
            `📷 Sunset photography near ${places[2]}`
        ];
    }

    return [
        `🌄 Enjoy ${places[0]}`,
        `🌲 Explore ${places[1]}`,
        `📸 Visit ${places[2]}`
    ];
}

function calculateBudget(hotel, days, travelers, budget) {
    const hotelPrice = hotel ? Number(hotel.price || 0) : 2500;

    const hotelCost = hotelPrice * days;

    let foodPerPerson;

    if (budget === "budget") {
        foodPerPerson = 700;
    } else if (budget === "premium") {
        foodPerPerson = 1600;
    } else {
        foodPerPerson = 1000;
    }

    const foodCost = foodPerPerson * days * travelers;

    let transportPerPerson;

    if (budget === "budget") {
        transportPerPerson = 1200;
    } else if (budget === "premium") {
        transportPerPerson = 3000;
    } else {
        transportPerPerson = 2000;
    }

    const transportCost = transportPerPerson * travelers;

    let activitiesPerPerson;

    if (budget === "budget") {
        activitiesPerPerson = 700;
    } else if (budget === "premium") {
        activitiesPerPerson = 2500;
    } else {
        activitiesPerPerson = 1400;
    }

    const activitiesCost = activitiesPerPerson * travelers;

    const subtotal =
        hotelCost +
        foodCost +
        transportCost +
        activitiesCost;

    const contingency = Math.round(subtotal * 0.10);

    const total = subtotal + contingency;

    const perPerson = Math.round(total / travelers);

    return {
        hotelCost,
        foodCost,
        transportCost,
        activitiesCost,
        contingency,
        total,
        perPerson
    };
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function createItinerary(destination, days, style, food) {
    const data = destinationData[destination];

    const itinerary = [];

    for (let i = 1; i <= days; i++) {
        const place1 = data.places[(i - 1) % data.places.length];
        const place2 = data.places[i % data.places.length];
        const place3 = data.places[(i + 1) % data.places.length];

        itinerary.push({
            day: i,
            title:
                i === 1
                    ? "Arrival & Exploration"
                    : i === days
                    ? "Final Day & Departure"
                    : `Explore ${data.name}`,
            morning:
                i === 1
                    ? `Arrive in ${data.name} and check into your stay.`
                    : `Start the day with ${place1}.`,
            afternoon:
                i === days
                    ? `Enjoy ${place2} before preparing for departure.`
                    : `Visit ${place2} and explore the surrounding area.`,
            evening:
                i === days
                    ? `Enjoy a final evening in ${data.name}.`
                    : `Relax and enjoy the local atmosphere near ${place3}.`,
            food
        });
    }

    return itinerary;
}

function renderHotel(hotel, destination) {
    if (!hotel) {
        return `
            <div class="tourism-card" style="padding:25px;">
                <h3>🏨 Recommended Stay</h3>
                <p>No hotel matching ${escapeHTML(destination)} is currently available in the database.</p>
            </div>
        `;
    }

    return `
        <div class="tourism-card" style="padding:25px;">
            <h3>🏨 Recommended Stay</h3>

            <h2>${escapeHTML(hotel.name)}</h2>

            <p>📍 ${escapeHTML(hotel.city || hotel.location || destination)}</p>

            <p>⭐ ${Number(hotel.rating || 0).toFixed(1)} / 5</p>

            <p>💰 ${formatCurrency(Number(hotel.price || 0))} per night</p>

            <p>${escapeHTML(hotel.facilities || "Comfortable stay")}</p>

            ${
                hotel.hotel_url
                    ? `<a class="btn" href="${escapeHTML(hotel.hotel_url)}" target="_blank">View Hotel</a>`
                    : ""
            }
        </div>
    `;
}

function renderBudget(budget) {
    return `
        <div class="tourism-card" style="padding:25px; margin-top:20px;">

            <h3>💰 Estimated Budget</h3>

            <p>
                <strong>Hotel:</strong>
                ${formatCurrency(budget.hotelCost)}
            </p>

            <p>
                <strong>Food:</strong>
                ${formatCurrency(budget.foodCost)}
            </p>

            <p>
                <strong>Transport:</strong>
                ${formatCurrency(budget.transportCost)}
            </p>

            <p>
                <strong>Activities:</strong>
                ${formatCurrency(budget.activitiesCost)}
            </p>

            <p>
                <strong>Contingency:</strong>
                ${formatCurrency(budget.contingency)}
            </p>

            <hr style="margin:15px 0;">

            <h2>
                Total: ${formatCurrency(budget.total)}
            </h2>

            <p>
                <strong>Per Person:</strong>
                ${formatCurrency(budget.perPerson)}
            </p>

        </div>
    `;
}

function renderItinerary(itinerary) {
    return `
        <h2 style="margin-top:30px;">📅 Day-by-Day Itinerary</h2>

        ${itinerary.map(day => `
            <div class="tourism-card" style="padding:25px; margin-top:18px;">

                <h3>Day ${day.day}: ${escapeHTML(day.title)}</h3>

                <p>🌅 <strong>Morning:</strong> ${escapeHTML(day.morning)}</p>

                <p>☀️ <strong>Afternoon:</strong> ${escapeHTML(day.afternoon)}</p>

                <p>🌙 <strong>Evening:</strong> ${escapeHTML(day.evening)}</p>

                <p>🍽️ <strong>Food:</strong> ${escapeHTML(day.food)}</p>

            </div>
        `).join("")}
    `;
}

function saveTrip(trip) {
    const existing = JSON.parse(
        localStorage.getItem("tourism360Trips") || "[]"
    );

    const duplicate = existing.some(item =>
        item.destination === trip.destination &&
        item.days === trip.days &&
        item.travelers === trip.travelers &&
        item.style === trip.style
    );

    if (!duplicate) {
        existing.push(trip);
        localStorage.setItem(
            "tourism360Trips",
            JSON.stringify(existing)
        );
    }

    renderSavedTrips();
}

function renderSavedTrips() {
    const container = document.getElementById("savedTripsContainer");

    if (!container) {
        return;
    }

    const trips = JSON.parse(
        localStorage.getItem("tourism360Trips") || "[]"
    );

    if (!trips.length) {
        container.innerHTML = "<p>No saved trips yet.</p>";
        return;
    }

    container.innerHTML = trips.map((trip, index) => `
        <div class="tourism-card" style="padding:20px; margin-top:15px;">

            <h3>${escapeHTML(trip.destinationName)} Trip</h3>

            <p>
                ${trip.days} Days •
                ${trip.travelers} Travelers •
                ${escapeHTML(trip.style)}
            </p>

            <button
                class="btn"
                onclick="viewSavedTrip(${index})"
            >
                View
            </button>

            <button
                class="btn"
                onclick="deleteSavedTrip(${index})"
            >
                Delete
            </button>

        </div>
    `).join("");
}

function viewSavedTrip(index) {
    const trips = JSON.parse(
        localStorage.getItem("tourism360Trips") || "[]"
    );

    const trip = trips[index];

    if (!trip) {
        return;
    }

    document.getElementById("itineraryOutput").innerHTML =
        trip.html;

    document.getElementById("itineraryOutput").style.display = "block";

    window.scrollTo({
        top: document.getElementById("itineraryOutput").offsetTop,
        behavior: "smooth"
    });
}

function deleteSavedTrip(index) {
    const trips = JSON.parse(
        localStorage.getItem("tourism360Trips") || "[]"
    );

    trips.splice(index, 1);

    localStorage.setItem(
        "tourism360Trips",
        JSON.stringify(trips)
    );

    renderSavedTrips();
}

document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("tripPlannerForm");

    if (!form) {
        return;
    }

    await loadHotels();

    renderSavedTrips();

    form.addEventListener("submit", async event => {
        event.preventDefault();

        const destination =
            document.getElementById("planDestination").value;

        const travelers =
            Number(document.getElementById("planTravelers").value);

        const days =
            Number(document.getElementById("planDays").value);

        const budget =
            document.getElementById("planBudget").value;

        const styleInput =
            document.querySelector(
                'input[name="travelStyle"]:checked'
            );

        const style =
            styleInput
                ? styleInput.value
                : "Nature & Scenery";

        if (!destination) {
            alert("Please select a destination.");
            return;
        }

        const data = destinationData[destination];

        if (!data) {
            alert("Destination data not found.");
            return;
        }

        const loading =
            document.getElementById("loading");

        const output =
            document.getElementById("itineraryOutput");

        const button =
            document.getElementById("createTripBtn");

        loading.style.display = "block";

        output.style.display = "none";

        button.disabled = true;

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );

        const hotel =
            selectHotel(destination, budget);

        const budgetData =
            calculateBudget(
                hotel,
                days,
                travelers,
                budget
            );

        const itinerary =
            createItinerary(
                destination,
                days,
                style,
                data.food
            );

        const html = `
            <div
                class="tourism-card"
                style="padding:25px;"
            >

                <h2>${escapeHTML(data.name)} Trip Plan</h2>

                <p>
                    ${days} Days •
                    ${travelers} Travelers •
                    ${escapeHTML(style)}
                </p>

                <p>
                    Budget: ${escapeHTML(budget)}
                </p>

            </div>

            ${renderHotel(hotel, data.name)}

            ${renderItinerary(itinerary)}

            ${renderBudget(budgetData)}

            <div style="margin-top:25px;">
                <button
                    class="btn"
                    onclick="window.print()"
                >
                    🖨️ Print Trip
                </button>
            </div>
        `;

        output.innerHTML = html;

        output.style.display = "block";

        loading.style.display = "none";

        button.disabled = false;

        saveTrip({
            destination,
            destinationName: data.name,
            travelers,
            days,
            budget,
            style,
            hotel: hotel ? hotel.name : null,
            html
        });

        output.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});