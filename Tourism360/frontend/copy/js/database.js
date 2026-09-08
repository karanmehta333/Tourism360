const SEED_USERS_DATASET = [
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

const SEED_ACTIVITY_LOGS = [
  {
    logId: "log_001",
    userId: "usr_501",
    action: "USER_SIGNIN",
    timestamp: "2026-03-09T00:30:00.000Z",
    details: "User Rahul Verma signed in successfully"
  },
  {
    logId: "log_002",
    userId: "usr_501",
    action: "BOOKING_CREATED",
    timestamp: "2026-03-09T00:35:00.000Z",
    details: "Booked Heritage Valley Wooden Suite in Nainital"
  }
];

const BackendDB = {
  init() {
    if (!localStorage.getItem("t360_users")) {
      localStorage.setItem("t360_users", JSON.stringify(SEED_USERS_DATASET));
    }
    if (!localStorage.getItem("t360_activity_logs")) {
      localStorage.setItem("t360_activity_logs", JSON.stringify(SEED_ACTIVITY_LOGS));
    }
    if (typeof fetch === "function" && window.location.protocol.startsWith("http")) {
      fetch("data/users_dataset.json")
        .then(res => {
          if (res.ok) return res.json();
          return null;
        })
        .then(data => {
          if (data && data.users && Array.isArray(data.users)) {
            const currentUsers = this.getUsers();
            if (currentUsers.length === 0) {
              localStorage.setItem("t360_users", JSON.stringify(data.users));
            }
            if (data.activity_logs && !localStorage.getItem("t360_activity_logs")) {
              localStorage.setItem("t360_activity_logs", JSON.stringify(data.activity_logs));
            }
          }
        })
        .catch(() => {});
    }
  },

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem("t360_users") || "[]");
    } catch (e) {
      return SEED_USERS_DATASET;
    }
  },

  saveUsers(users) {
    localStorage.setItem("t360_users", JSON.stringify(users));
  },

  getUserByEmail(email) {
    const users = this.getUsers();
    return users.find(u => u.email.toLowerCase() === (email || "").toLowerCase().trim()) || null;
  },

  getUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  },

  registerUser(userData) {
    const email = (userData.email || "").trim().toLowerCase();
    const existing = this.getUserByEmail(email);
    if (existing) {
      return { success: false, message: "An account with this email address already exists in the database." };
    }

    const users = this.getUsers();
    const newUser = {
      id: "usr_" + Date.now(),
      name: (userData.name || "").trim(),
      email: email,
      password: userData.password,
      phone: (userData.phone || "").trim(),
      location: (userData.location || "").trim() || "Uttarakhand / India",
      interests: (userData.interests || "").trim() || "Alpine Treks, Heritage Stays, Local Food",
      registeredAt: new Date().toISOString().split("T")[0],
      role: "tourist",
      totalBookings: 0,
      loginHistory: [
        {
          timestamp: new Date().toISOString(),
          ip: "127.0.0.1",
          status: "Success"
        }
      ]
    };

    users.push(newUser);
    this.saveUsers(users);
    this.addActivityLog(newUser.id, "USER_REGISTERED", "New tourist account registered: " + newUser.name);

    if (typeof setCurrentUser === "function") {
      setCurrentUser(newUser);
    } else {
      localStorage.setItem("t360_current_user", JSON.stringify(newUser));
    }

    return { success: true, user: newUser, message: "Account registered successfully in dataset." };
  },

  loginUser(email, password) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const users = this.getUsers();
    const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (userIndex === -1) {
      this.addActivityLog(null, "LOGIN_FAILED", "Failed login attempt for email: " + cleanEmail);
      return { success: false, message: "Invalid email or password. Please check your credentials or create a new account." };
    }

    const user = users[userIndex];
    if (!user.loginHistory) user.loginHistory = [];
    user.loginHistory.push({
      timestamp: new Date().toISOString(),
      ip: "127.0.0.1",
      status: "Success"
    });
    users[userIndex] = user;
    this.saveUsers(users);

    this.addActivityLog(user.id, "USER_SIGNIN", "User signed in: " + user.name);

    if (typeof setCurrentUser === "function") {
      setCurrentUser(user);
    } else {
      localStorage.setItem("t360_current_user", JSON.stringify(user));
    }

    return { success: true, user: user, message: "Authentication successful." };
  },

  updateUserProfile(userId, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);
    if (index === -1) return { success: false, message: "User not found in dataset." };

    users[index] = { ...users[index], ...updates };
    this.saveUsers(users);

    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : JSON.parse(localStorage.getItem("t360_current_user") || "null");
    if (currentUser && currentUser.id === userId) {
      const updated = users[index];
      if (typeof setCurrentUser === "function") {
        setCurrentUser(updated);
      } else {
        localStorage.setItem("t360_current_user", JSON.stringify(updated));
      }
    }

    this.addActivityLog(userId, "PROFILE_UPDATED", "User profile updated: " + users[index].name);
    return { success: true, user: users[index] };
  },

  getActivityLogs() {
    try {
      return JSON.parse(localStorage.getItem("t360_activity_logs") || "[]");
    } catch (e) {
      return SEED_ACTIVITY_LOGS;
    }
  },

  addActivityLog(userId, action, details) {
    const logs = this.getActivityLogs();
    logs.unshift({
      logId: "log_" + Date.now(),
      userId: userId || "anonymous",
      action: action,
      timestamp: new Date().toISOString(),
      details: details
    });
    if (logs.length > 50) logs.pop();
    localStorage.setItem("t360_activity_logs", JSON.stringify(logs));
  },

  exportDatasetJSON() {
    const dataset = {
      dataset_version: "1.0.0",
      project: "Tourism 360 - Explore Beyond the Map",
      exported_at: new Date().toISOString(),
      users: this.getUsers(),
      activity_logs: this.getActivityLogs(),
      vendors: typeof getStoredVendors === "function" ? getStoredVendors() : JSON.parse(localStorage.getItem("t360_vendors") || "[]"),
      listings: typeof getStoredListings === "function" ? getStoredListings() : JSON.parse(localStorage.getItem("t360_listings") || "[]"),
      bookings: typeof getStoredBookings === "function" ? getStoredBookings() : JSON.parse(localStorage.getItem("t360_bookings") || "[]")
    };
    return JSON.stringify(dataset, null, 2);
  },

  resetDatasetToDefault() {
    localStorage.setItem("t360_users", JSON.stringify(SEED_USERS_DATASET));
    localStorage.setItem("t360_activity_logs", JSON.stringify(SEED_ACTIVITY_LOGS));
    return { success: true, message: "Dataset restored to pre-seeded defaults." };
  }
};

BackendDB.init();
