# 🎬 FilmVera  
[![Expo](https://img.shields.io/badge/Built%20with-Expo-4630EB?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0A80B0?logo=react&logoColor=white)](https://reactnative.dev/)
[![TMDb API](https://img.shields.io/badge/Powered%20by-TMDb-01B4E4?logo=themoviedatabase&logoColor=white)](https://developer.themoviedb.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📱 Overview

**FilmVera** is a mobile movie streaming app built with **React Native + Expo**, inspired by Netflix.  
It allows users to explore trending and popular movies using data from **The Movie Database (TMDb)**.  

Includes:
- Beautiful light & dark modes 🌗  
- Animated theme toggle ✨  
- Custom splash screen 🚀  
- Smooth UI and movie previews 🎞️  

---

## 🚀 Features

✅ Browse real movies via TMDb API  
✅ Animated theme toggle (Light/Dark)  
✅ Global theme context  
✅ Fast and responsive design  
✅ Expo Router navigation  
✅ Moti animations for smooth UI  

---

## 🧰 Built With

- **React Native + Expo**
- **Expo Router**
- **Moti & React Native Reanimated**
- **Context API (for global state)**
- **TMDb API** (for movie data)

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/filmvera.git
cd filmvera
2️⃣ Install dependencies
npm install

3️⃣ Add your TMDb API key
Create a .env file in the project root:
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_API_BASE_URL=https://api.themoviedb.org/3

4️⃣ Start the app
npx expo start

Then scan the QR code with the Expo Go app 📱

🎨 App Overview


Home screen shows popular movies with posters and titles.


Tap the theme toggle (☀️ / 🌙) to switch modes.


Uses TMDb API for live movie data.


Includes a custom splash screen on launch.



📂 Folder Structure
filmvera/
├── app/               # Screens and navigation
├── src/
│   ├── api/           # TMDb API functions
│   ├── components/    # Reusable UI (ThemeToggle, ThemedView, etc.)
│   ├── context/       # Global states (app, theme)
│   └── theme/         # Colors & theming system
├── assets/            # Images and logos
├── .env               # Environment variables
└── app.json           # Expo configuration


💡 Future Plans


🎥 Movie details screen with trailers


❤️ Watchlist & Favorites


🔐 User login system


🕶 Smooth transitions and caching



📄 License
This project is licensed under the MIT License — feel free to use or modify it.

👨‍💻 Author
Mustafa Muhammad
Frontend Developer | UI & Frontend Specialist
🌐 GitHub • LinkedIn

🎥 Stream. Chill. FilmVera
