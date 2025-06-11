# 🚗 On Road Vehicle Breakdown Help Assistant

This project is a full-stack web application designed to assist users in the event of a vehicle breakdown. It helps connect users to nearby service providers using geolocation and maps integration.

---

## 🌟 Features

- 🔍 **User Location Detection** via browser geolocation API
- 🗺️ **Map Integration** using GoMaps API
- 🧰 **Service Provider Listings** based on proximity
- 📞 **One-Click Call** to nearby mechanics or tow services
- 📝 **User Registration & Login**
---

## 🛠️ Tech Stack

### Frontend
- React.js
- GoMaps API

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for Authentication

---

# Clone the repo
```bash
git clone https://github.com/Dhruv1617/On-Road-Vehicle-Breakdown-Help-Assistant.git
cd On-Road-Vehicle-Breakdown-Help-Assistant
````

# Install backend dependencies
```bash
cd backend
npm install
```


# Install frontend dependencies
```bash
cd ..
npm install
```

---

# Configure Environment Variables

Create backend/.env
```ini
PORT=5000
MONGODB_URI=your_mongo_uri_here
JWT_SECRET=your_jwt_secret
GOMAPS_API_KEY=your_gomaps_api_key
```

Create ../.env
```ini
VITE_GOMAPS_API_KEY=your_gomaps_api_key
```

---
# Run the App
Start Backend
```bash
cd backend
npm start
```

Start Frontend
```bash
cd ../frontend
npm run dev
```
---

# 📸 Screenshots
![Screenshot From 2025-05-14 15-23-55](https://github.com/user-attachments/assets/33ce95ca-282e-42c4-8acb-ca52128eea7c)
![Screenshot From 2025-05-14 10-19-32](https://github.com/user-attachments/assets/322c3492-00c7-41a7-b94f-652e4e776bf3)
