const DEFAULT_VENDORS = [
  {
    id: "ven_101",
    name: "Sunil Rawat",
    businessName: "Himalayan Pine Retreat",
    email: "sunil@pinehomestay.com",
    password: "password123",
    businessType: "Hotel / Homestay",
    district: "Nainital",
    city: "Bhowali / Nainital",
    address: "Upper Mall Road, Near Pine Ridge, Nainital, Uttarakhand 263002",
    phone: "+91 98765 43210",
    about: "Tranquil family-run wooden cottage overlooking the emerald valley with organic Kumaoni food, bonfire evenings, and guided walking tours.",
    openingHours: "Open 24 Hours",
    priceRange: "₹2,200 - ₹4,500 / night",
    services: "Cozy Woodfire Rooms, Homemade Organic Dining, Forest Trail Walks, Wi-Fi",
    facilities: "Private Parking, Hot Water Geysers, Mountain View Balcony, Work Desk",
    socialLink: "https://instagram.com/himalayanpineretreat",
    image: "assets/images/nainital.jpg",
    status: "Approved",
    joinedDate: "2026-02-15"
  },
  {
    id: "ven_102",
    name: "Deepak Mehra",
    businessName: "Panchachuli Alpine Treks & Guides",
    email: "deepak@joharhikers.com",
    password: "password123",
    businessType: "Trekking Guide",
    district: "Munsiyari",
    city: "Munsiyari",
    address: "Main Market, Near Johar Museum, Munsiyari 262554",
    phone: "+91 94120 12345",
    about: "Certified IMF mountaineer offering guided treks to Khaliya Top, Milam Glacier, and Ralam Pass with licensed local porters and snow gear.",
    openingHours: "06:00 AM - 08:00 PM",
    priceRange: "₹1,500 - ₹3,500 / day",
    services: "Alpine Trekking, Camping Equipment, Local Folk Story Sessions, Bird Watching",
    facilities: "High-Altitude Tents, First Aid & Oxygen Kits, Certified Guide Badges",
    socialLink: "https://instagram.com/panchachuli_treks",
    image: "assets/images/munsiyari.jpg",
    status: "Approved",
    joinedDate: "2026-01-20"
  },
  {
    id: "ven_103",
    name: "Pooja Joshi",
    businessName: "Kumaon Rasoi Heritage Dhaba",
    email: "pooja@kumaonrasoi.com",
    password: "password123",
    businessType: "Restaurant",
    district: "Almora",
    city: "Almora",
    address: "Lala Bazaar, Heritage Street, Almora 263601",
    phone: "+91 98370 65432",
    about: "Authentic Kumaoni traditional kitchen serving authentic iron-kadai Bhatt ki Churkani, Dubuk, Mandua Rotis, and Singori sweets.",
    openingHours: "08:00 AM - 10:00 PM",
    priceRange: "₹250 - ₹600 per person",
    services: "Pure Vegetarian Mountain Thalis, Authentic Jakhya Spices, Sweet Boxes",
    facilities: "Traditional Wooden Seating, Takeaway Packaging, Clean Drinking Water",
    socialLink: "https://instagram.com/kumaonrasoi",
    image: "assets/images/almora.jpg",
    status: "Approved",
    joinedDate: "2026-02-01"
  }
];

const DEFAULT_LISTINGS = [
  {
    id: "list_201",
    vendorId: "ven_101",
    vendorName: "Sunil Rawat",
    businessName: "Himalayan Pine Retreat",
    title: "Heritage Valley Wooden Suite",
    category: "Hotel",
    district: "nainital",
    districtDisplay: "Nainital",
    shortDesc: "Rustic cedar wood suite with panoramic Naini hills views and private bonfire balcony.",
    description: "Experience genuine mountain serenity surrounded by whispering pines. Includes heated rooms, traditional Kumaoni breakfast, fast Wi-Fi, and terrace stargazing.",
    price: "2400",
    priceDisplay: "₹2,400 / night",
    priceTier: "moderate",
    services: "Breakfast Included, Bonfire, Nature Walks, Wi-Fi",
    facilities: "Attached Bathroom, Geyser, Parking, Valley View",
    contact: "+91 98765 43210",
    bestTime: "September to June",
    rating: 4.8,
    image: "assets/images/nainital.jpg",
    status: "Published",
    createdAt: "2026-02-18"
  },
  {
    id: "list_202",
    vendorId: "ven_102",
    vendorName: "Deepak Mehra",
    businessName: "Panchachuli Alpine Treks & Guides",
    title: "Khaliya Top 2-Day Alpine Snow Trek",
    category: "Trekking Guide",
    district: "munsiyari",
    districtDisplay: "Munsiyari",
    shortDesc: "Guided summit hike to 11,500 ft bugyals with unmatched 360-degree Panchachuli panoramas.",
    description: "Complete summit expedition package including certified mountain guide, high-grade Quechua tents, sleeping bags, hot mountain meals, and emergency alpine gear.",
    price: "2800",
    priceDisplay: "₹2,800 / person",
    priceTier: "moderate",
    services: "Certified Guide, Tents & Sleeping Mats, All Meals, First Aid",
    facilities: "Camping Gear, Warm Sleeping Bags, Trek Permits Assistance",
    contact: "+91 94120 12345",
    bestTime: "October to May",
    rating: 4.9,
    image: "assets/images/munsiyari.jpg",
    status: "Published",
    createdAt: "2026-02-20"
  },
  {
    id: "list_203",
    vendorId: "ven_103",
    vendorName: "Pooja Joshi",
    businessName: "Kumaon Rasoi Heritage Dhaba",
    title: "Authentic Pahadi Thali & Iron-Kadai Feast",
    category: "Restaurant",
    district: "almora",
    districtDisplay: "Almora",
    shortDesc: "Organic traditional meal featuring Bhatt ki Churkani, Aloo Gutke, Mandua Roti, and Bhang Chutney.",
    description: "Cooked in traditional iron vessels over mountain oak embers. Freshly picked wild herbs and locally grown organic millets served with pride.",
    price: "350",
    priceDisplay: "₹350 / thali",
    priceTier: "budget",
    services: "Unlimited Thali Refills, Heritage Singori Sweet, Herbal Tea",
    facilities: "Clean Dining Hall, Handwash Stations, Organic Spices for Sale",
    contact: "+91 98370 65432",
    bestTime: "All Year",
    rating: 4.7,
    image: "assets/images/almora.jpg",
    status: "Published",
    createdAt: "2026-02-25"
  }
];

const DEFAULT_BOOKINGS = [
  {
    id: "bk_301",
    vendorId: "ven_101",
    listingTitle: "Heritage Valley Wooden Suite",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@example.com",
    customerPhone: "+91 98111 22334",
    date: "2026-03-18",
    guests: 2,
    amount: "₹4,800",
    status: "Confirmed",
    createdAt: "2026-03-01"
  },
  {
    id: "bk_302",
    vendorId: "ven_101",
    listingTitle: "Heritage Valley Wooden Suite",
    customerName: "Sneha Kapur",
    customerEmail: "sneha.k@example.com",
    customerPhone: "+91 97222 33445",
    date: "2026-03-24",
    guests: 3,
    amount: "₹7,200",
    status: "Pending",
    createdAt: "2026-03-05"
  },
  {
    id: "bk_303",
    vendorId: "ven_102",
    listingTitle: "Khaliya Top 2-Day Alpine Snow Trek",
    customerName: "Rohan Varma",
    customerEmail: "rohan.v@example.com",
    customerPhone: "+91 99887 76655",
    date: "2026-04-02",
    guests: 4,
    amount: "₹11,200",
    status: "Confirmed",
    createdAt: "2026-03-04"
  }
];

const DEFAULT_REVIEWS = [
  {
    id: "rev_401",
    vendorId: "ven_101",
    customerName: "Vikram Malhotra",
    rating: 5,
    comment: "Magnificent stay! Sunil-ji was an incredible host and the bonfire with pahadi chai was the highlight of our Nainital holiday.",
    date: "2026-02-28"
  },
  {
    id: "rev_402",
    vendorId: "ven_101",
    customerName: "Ananya Sen",
    rating: 4.5,
    comment: "Peaceful environment far from crowd. Organic food made fresh from their own terrace farm.",
    date: "2026-02-22"
  },
  {
    id: "rev_403",
    vendorId: "ven_102",
    customerName: "Karan Singhania",
    rating: 5,
    comment: "Deepak is the best guide in Munsiyari. Safe snow trekking, patient with beginners, and very knowledgeable about the peaks.",
    date: "2026-02-26"
  }
];

const DEFAULT_USERS = [
  {
    id: "usr_501",
    name: "Rahul Verma",
    email: "rahul.tourist@gmail.com",
    password: "tourist123",
    phone: "+91 98111 22334",
    location: "Delhi / NCR",
    interests: "Alpine Treks, Heritage Homestays, Kumaoni Cuisine",
    registeredAt: "2026-02-10",
    role: "tourist",
    totalBookings: 2,
    loginHistory: [
      { timestamp: "2026-03-08T10:15:00.000Z", ip: "192.168.1.10", status: "Success" },
      { timestamp: "2026-03-09T00:30:00.000Z", ip: "192.168.1.10", status: "Success" }
    ]
  },
  {
    id: "usr_502",
    name: "Priya Sharma",
    email: "priya.sharma@outlook.com",
    password: "password123",
    phone: "+91 98765 11223",
    location: "Chandigarh",
    interests: "Lakeside Camping, Stargazing, Photography",
    registeredAt: "2026-02-18",
    role: "tourist",
    totalBookings: 1,
    loginHistory: [
      { timestamp: "2026-03-07T14:22:00.000Z", ip: "192.168.1.15", status: "Success" }
    ]
  },
  {
    id: "usr_503",
    name: "Amit Negi",
    email: "amit.negi@gmail.com",
    password: "password123",
    phone: "+91 94111 88990",
    location: "Dehradun, Uttarakhand",
    interests: "Glacier Expeditions, High Altitude Passes",
    registeredAt: "2026-02-25",
    role: "tourist",
    totalBookings: 0,
    loginHistory: []
  }
];

function initLocalStorage() {
  if (!localStorage.getItem("t360_users")) {
    localStorage.setItem("t360_users", JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem("t360_vendors")) {
    localStorage.setItem("t360_vendors", JSON.stringify(DEFAULT_VENDORS));
  }
  if (!localStorage.getItem("t360_listings")) {
    localStorage.setItem("t360_listings", JSON.stringify(DEFAULT_LISTINGS));
  }
  if (!localStorage.getItem("t360_bookings")) {
    localStorage.setItem("t360_bookings", JSON.stringify(DEFAULT_BOOKINGS));
  }
  if (!localStorage.getItem("t360_reviews")) {
    localStorage.setItem("t360_reviews", JSON.stringify(DEFAULT_REVIEWS));
  }
}

initLocalStorage();

function getStoredUsers() {
  return JSON.parse(localStorage.getItem("t360_users") || "[]");
}

function saveStoredUsers(users) {
  localStorage.setItem("t360_users", JSON.stringify(users));
}

function getCurrentUser() {
  const data = localStorage.getItem("t360_current_user");
  return data ? JSON.parse(data) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem("t360_current_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("t360_current_user");
  }
}

function requireUserAuth() {
  const current = getCurrentUser();
  if (!current) {
    window.location.href = "login.html";
    return null;
  }
  return current;
}

function handleUserLogout() {
  localStorage.removeItem("t360_current_user");
  localStorage.removeItem("t360_current_vendor");
  localStorage.removeItem("t360_admin_session");
  window.location.href = "login.html";
}

function handleUniversalLogout() {
  localStorage.removeItem("t360_current_user");
  localStorage.removeItem("t360_current_vendor");
  localStorage.removeItem("t360_admin_session");
  window.location.href = "login.html";
}

window.handleUserLogout = handleUserLogout;
window.handleUniversalLogout = handleUniversalLogout;
window.logout = handleUniversalLogout;

function getStoredVendors() {
  return JSON.parse(localStorage.getItem("t360_vendors") || "[]");
}

function saveStoredVendors(vendors) {
  localStorage.setItem("t360_vendors", JSON.stringify(vendors));
}

function getStoredListings() {
  return JSON.parse(localStorage.getItem("t360_listings") || "[]");
}

function saveStoredListings(listings) {
  localStorage.setItem("t360_listings", JSON.stringify(listings));
}

function getStoredBookings() {
  return JSON.parse(localStorage.getItem("t360_bookings") || "[]");
}

function saveStoredBookings(bookings) {
  localStorage.setItem("t360_bookings", JSON.stringify(bookings));
}

function getStoredReviews() {
  return JSON.parse(localStorage.getItem("t360_reviews") || "[]");
}

function saveStoredReviews(reviews) {
  localStorage.setItem("t360_reviews", JSON.stringify(reviews));
}

function getCurrentVendor() {
  const data = localStorage.getItem("t360_current_vendor");
  return data ? JSON.parse(data) : null;
}

function setCurrentVendor(vendor) {
  if (vendor) {
    localStorage.setItem("t360_current_vendor", JSON.stringify(vendor));
  } else {
    localStorage.removeItem("t360_current_vendor");
  }
}

function requireVendorAuth() {
  const current = getCurrentVendor();
  if (!current) {
    window.location.href = "vendor-login.html";
    return null;
  }
  return current;
}

function getCurrentAdmin() {
  const data = localStorage.getItem("t360_admin_session");
  return data ? JSON.parse(data) : null;
}

function setCurrentAdmin(admin) {
  if (admin) {
    localStorage.setItem("t360_admin_session", JSON.stringify(admin));
  } else {
    localStorage.removeItem("t360_admin_session");
  }
}

function requireAdminAuth() {
  const admin = getCurrentAdmin();
  if (!admin) {
    window.location.href = "admin-login.html";
    return null;
  }
  return admin;
}

function calculateProfileCompletion(vendor) {
  if (!vendor) return 0;
  const fields = [
    vendor.name,
    vendor.businessName,
    vendor.email,
    vendor.phone,
    vendor.businessType,
    vendor.district,
    vendor.address,
    vendor.about,
    vendor.openingHours,
    vendor.priceRange,
    vendor.services,
    vendor.facilities,
    vendor.image
  ];

  let completed = 0;
  fields.forEach(f => {
    if (f && String(f).trim().length > 0) {
      completed++;
    }
  });

  return Math.round((completed / fields.length) * 100);
}

function showPortalToast(message, type) {
  const existing = document.getElementById("portalToast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "portalToast";
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.padding = "14px 22px";
  toast.style.borderRadius = "10px";
  toast.style.fontWeight = "700";
  toast.style.fontSize = "0.92rem";
  toast.style.zIndex = "9999";
  toast.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  toast.style.animation = "fadeIn 0.3s ease";
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.gap = "8px";

  if (type === "success") {
    toast.style.backgroundColor = "#16a34a";
    toast.style.color = "#ffffff";
    toast.innerHTML = "<span>✓</span> " + message;
  } else if (type === "error") {
    toast.style.backgroundColor = "#dc2626";
    toast.style.color = "#ffffff";
    toast.innerHTML = "<span>⚠</span> " + message;
  } else {
    toast.style.backgroundColor = "#0284c7";
    toast.style.color = "#ffffff";
    toast.innerHTML = "<span>ℹ</span> " + message;
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

function renderVendorSidebar(activePage) {
  const sidebarContainer = document.getElementById("vendorSidebar");
  if (!sidebarContainer) return;

  const vendor = getCurrentVendor() || {
    name: "Guest Business",
    businessName: "My Mountain Stay",
    businessType: "Hotel / Homestay"
  };

  const initial = (vendor.businessName || vendor.name || "V").charAt(0).toUpperCase();

  sidebarContainer.innerHTML = `
    <div class="sidebar-brand">
      <a href="index.html" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
        <img src="assets/icons/logo.svg" alt="Tourism 360 Logo">
        <div>
          <span class="sidebar-brand-title">TOURISM <span>360°</span></span>
          <span class="sidebar-brand-sub">Vendor Portal</span>
        </div>
      </a>
    </div>

    <div class="sidebar-user-card">
      <div class="user-avatar">${initial}</div>
      <div class="user-info">
        <div class="user-name" title="${vendor.businessName}">${vendor.businessName}</div>
        <span class="user-type-badge">${vendor.businessType || 'Partner'}</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="sidebar-menu">
        <li class="sidebar-item">
          <a href="vendor-dashboard.html" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''}">
            <span class="sidebar-icon">📊</span>
            <span>Dashboard</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="vendor-profile.html" class="sidebar-link ${activePage === 'profile' ? 'active' : ''}">
            <span class="sidebar-icon">🏢</span>
            <span>My Profile</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="vendor-add-listing.html" class="sidebar-link ${activePage === 'add-listing' ? 'active' : ''}">
            <span class="sidebar-icon">➕</span>
            <span>Add Listing</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="vendor-my-listings.html" class="sidebar-link ${activePage === 'listings' ? 'active' : ''}">
            <span class="sidebar-icon">📋</span>
            <span>My Listings</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="vendor-bookings.html" class="sidebar-link ${activePage === 'bookings' ? 'active' : ''}">
            <span class="sidebar-icon">📅</span>
            <span>Bookings</span>
          </a>
        </li>
        <li class="sidebar-item">
          <a href="vendor-settings.html" class="sidebar-link ${activePage === 'settings' ? 'active' : ''}">
            <span class="sidebar-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </li>
        <li class="sidebar-item" style="margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.5rem;">
          <a href="index.html" class="sidebar-link" target="_blank">
            <span class="sidebar-icon">🌐</span>
            <span>View Tourist Site &rarr;</span>
          </a>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button type="button" class="btn-sidebar-logout" onclick="handleVendorLogout()">
        <span>🚪</span> Log Out
      </button>
    </div>
  `;

  const toggleBtn = document.querySelector(".sidebar-toggle-mobile");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebarContainer.classList.toggle("active");
    });
  }
}

function handleVendorLogout() {
  localStorage.removeItem("t360_current_vendor");
  localStorage.removeItem("t360_current_user");
  localStorage.removeItem("t360_admin_session");
  window.location.href = "vendor-login.html";
}

function handleAdminLogout() {
  localStorage.removeItem("t360_admin_session");
  localStorage.removeItem("t360_current_user");
  localStorage.removeItem("t360_current_vendor");
  window.location.href = "admin-login.html";
}

window.handleVendorLogout = handleVendorLogout;
window.handleAdminLogout = handleAdminLogout;

function resetDemoData() {
  localStorage.setItem("t360_users", JSON.stringify(DEFAULT_USERS));
  localStorage.setItem("t360_vendors", JSON.stringify(DEFAULT_VENDORS));
  localStorage.setItem("t360_listings", JSON.stringify(DEFAULT_LISTINGS));
  localStorage.setItem("t360_bookings", JSON.stringify(DEFAULT_BOOKINGS));
  localStorage.setItem("t360_reviews", JSON.stringify(DEFAULT_REVIEWS));
  showPortalToast("Demo data successfully reset to initial state!", "success");
  setTimeout(() => window.location.reload(), 1000);
}

function openBookingModal(listingTitle, vendorId, price) {
  const existingModal = document.getElementById("touristBookingModal");
  if (existingModal) existingModal.remove();

  const user = getCurrentUser();

  const modal = document.createElement("div");
  modal.id = "touristBookingModal";
  modal.className = "portal-modal-backdrop";
  modal.innerHTML = `
    <div class="portal-modal-content">
      <div class="portal-modal-header">
        <h3>Book / Inquire: ${listingTitle}</h3>
        <button type="button" class="portal-modal-close" onclick="document.getElementById('touristBookingModal').remove()">&times;</button>
      </div>
      <form id="touristDirectBookingForm" class="portal-modal-body">
        <input type="hidden" id="bookVendorId" value="${vendorId || ''}">
        <input type="hidden" id="bookListingTitle" value="${listingTitle}">
        
        <div class="portal-form-group" style="margin-bottom: 1rem;">
          <label class="portal-label">Your Full Name <span class="required">*</span></label>
          <input type="text" id="bookCustName" class="portal-input" placeholder="e.g. Rahul Verma" value="${user ? user.name : ''}" required>
        </div>

        <div class="portal-form-group" style="margin-bottom: 1rem;">
          <label class="portal-label">Email Address <span class="required">*</span></label>
          <input type="email" id="bookCustEmail" class="portal-input" placeholder="e.g. rahul@example.com" value="${user ? user.email : ''}" required>
        </div>

        <div class="portal-form-group" style="margin-bottom: 1rem;">
          <label class="portal-label">Mobile Number <span class="required">*</span></label>
          <input type="tel" id="bookCustPhone" class="portal-input" placeholder="e.g. +91 98765 43210" value="${user ? user.phone : ''}" required>
        </div>

        <div class="portal-form-grid" style="margin-bottom: 1rem;">
          <div class="portal-form-group">
            <label class="portal-label">Travel / Check-in Date <span class="required">*</span></label>
            <input type="date" id="bookDate" class="portal-input" required>
          </div>
          <div class="portal-form-group">
            <label class="portal-label">Number of People / Guests</label>
            <input type="number" id="bookGuests" class="portal-input" min="1" max="20" value="2">
          </div>
        </div>

        <div class="portal-form-group" style="margin-bottom: 1rem;">
          <label class="portal-label">Special Request / Message</label>
          <textarea id="bookNotes" class="portal-textarea" rows="2" placeholder="Arrival time, meal preferences, extra beds..."></textarea>
        </div>

        <div class="disclaimer-banner" style="margin-top: 0.5rem;">
          Simulation: This request will be instantly dispatched to the local business owner's portal dashboard.
        </div>

        <div class="portal-modal-footer" style="padding-left: 0; padding-right: 0; margin-top: 1.25rem;">
          <button type="button" class="btn-action-sm btn-action-outline" onclick="document.getElementById('touristBookingModal').remove()">Cancel</button>
          <button type="submit" class="btn-action-sm btn-action-primary" style="padding: 0.6rem 1.25rem; font-size: 0.9rem;">Submit Booking Request</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("bookDate");
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today;
  }

  const form = document.getElementById("touristDirectBookingForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const custName = document.getElementById("bookCustName").value.trim();
    const custEmail = document.getElementById("bookCustEmail").value.trim();
    const custPhone = document.getElementById("bookCustPhone").value.trim();
    const date = document.getElementById("bookDate").value;
    const guests = parseInt(document.getElementById("bookGuests").value) || 2;
    const vId = document.getElementById("bookVendorId").value || "ven_101";
    const title = document.getElementById("bookListingTitle").value;

    const newBooking = {
      id: "bk_" + Date.now(),
      vendorId: vId,
      listingTitle: title,
      customerName: custName,
      customerEmail: custEmail,
      customerPhone: custPhone,
      date: date,
      guests: guests,
      amount: price || "₹" + (guests * 1500).toLocaleString("en-IN"),
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0]
    };

    const bookings = getStoredBookings();
    bookings.unshift(newBooking);
    saveStoredBookings(bookings);

    modal.remove();
    showPortalToast("Booking request sent directly to local vendor!", "success");
  });
}

function initUserNavStatus() {
  const user = getCurrentUser();
  const vendor = getCurrentVendor();
  const admin = getCurrentAdmin();

  const authLinks = document.querySelectorAll(".nav-btn-auth, #navAuthLink");
  authLinks.forEach(link => {
    const parentActions = link.closest(".nav-actions");
    if (user) {
      link.href = "user-dashboard.html";
      link.innerHTML = "<span>👤</span> " + escapeHtml(user.name.split(' ')[0]);
      link.style.backgroundColor = "#15803d";
      if (parentActions && !parentActions.querySelector(".nav-btn-logout")) {
        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "nav-btn-logout";
        logoutBtn.id = "navLogoutBtn";
        logoutBtn.innerHTML = "<span>🚪</span> Log Out";
        logoutBtn.onclick = handleUserLogout;
        link.parentNode.insertBefore(logoutBtn, link.nextSibling);
      }
    } else if (vendor) {
      link.href = "vendor-dashboard.html";
      link.innerHTML = "<span>🏢</span> " + escapeHtml((vendor.businessName || vendor.name).split(' ')[0]);
      link.style.backgroundColor = "#0284c7";
      if (parentActions && !parentActions.querySelector(".nav-btn-logout")) {
        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "nav-btn-logout";
        logoutBtn.id = "navLogoutBtn";
        logoutBtn.innerHTML = "<span>🚪</span> Log Out";
        logoutBtn.onclick = handleVendorLogout;
        link.parentNode.insertBefore(logoutBtn, link.nextSibling);
      }
    } else if (admin) {
      link.href = "admin-dashboard.html";
      link.innerHTML = "<span>🛡️</span> Admin Panel";
      link.style.backgroundColor = "#0b1f3a";
      if (parentActions && !parentActions.querySelector(".nav-btn-logout")) {
        const logoutBtn = document.createElement("button");
        logoutBtn.type = "button";
        logoutBtn.className = "nav-btn-logout";
        logoutBtn.id = "navLogoutBtn";
        logoutBtn.innerHTML = "<span>🚪</span> Log Out";
        logoutBtn.onclick = handleAdminLogout;
        link.parentNode.insertBefore(logoutBtn, link.nextSibling);
      }
    } else {
      link.href = "login.html";
      link.innerHTML = "<span>🔑</span> Login / Sign In";
      link.style.backgroundColor = "#1d82b8";
      if (parentActions) {
        const existingLogout = parentActions.querySelector(".nav-btn-logout, #navLogoutBtn");
        if (existingLogout) existingLogout.remove();
      }
    }
  });

  const navLinks = document.querySelector(".nav-links");
  if (navLinks && document.querySelectorAll(".nav-btn-auth, #navAuthLink").length === 0) {
    let existingUserLink = document.getElementById("navUserStatusItem");
    if (existingUserLink) existingUserLink.remove();

    const li = document.createElement("li");
    li.className = "nav-item";
    li.id = "navUserStatusItem";

    if (user) {
      li.innerHTML = `
        <a href="user-dashboard.html" class="nav-btn-auth" style="background-color: #15803d;">
          <span>👤</span> ${escapeHtml(user.name.split(' ')[0])}
        </a>
      `;
    } else {
      li.innerHTML = `
        <a href="login.html" class="nav-btn-auth">
          <span>🔑</span> Login / Sign In
        </a>
      `;
    }

    navLinks.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initUserNavStatus();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("#btnUserLogoutTop, #btnUserLogoutBottom, #btnAdminLogout, #navLogoutBtn, .btn-sidebar-logout, .nav-btn-logout, .btn-logout, [data-action='logout'], [data-logout]");
  if (btn) {
    e.preventDefault();
    if (btn.id === "btnAdminLogout") {
      handleAdminLogout();
    } else if (btn.classList.contains("btn-sidebar-logout") || window.location.pathname.includes("vendor-")) {
      handleVendorLogout();
    } else {
      handleUserLogout();
    }
  }
});
