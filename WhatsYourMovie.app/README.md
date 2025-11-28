# 🎬 WhatsYourMovie - Movie Recommendation App

A modern, full-stack movie recommendation application with a Tinder-style swipe interface. Select your top 10 favorite movies, swipe through recommendations, and get personalized movie suggestions based on your preferences.

## ✨ Features

- **User Authentication**: Full sign up, login, and logout functionality
- **Movie Database**: Integrated with TMDB API for 100+ popular movies
- **Top 10 Selection**: Choose your 10 favorite movies to train the recommendation algorithm
- **Swipe Interface**: Tinder-style swipe right (like) or left (dislike)
- **Smart Recommendations**: Algorithm-based movie suggestions using your Top 10 and swipe history
- **Beautiful UI**: Modern design with Inter font and rounded edges
- **Persistent Data**: All user data, preferences, and swipes stored in SQLite

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express
- **SQLite** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **TMDB API** for movie data

### Frontend
- **React** 18
- **React Router** for navigation
- **Axios** for API calls
- **Modern CSS** with Inter font family
- **Fully responsive** design

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (get it free at https://www.themoviedb.org/settings/api)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure TMDB API Key

Edit `backend/.env` and add your TMDB API key:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE
```

To get a TMDB API key:
1. Go to https://www.themoviedb.org/
2. Create a free account
3. Go to Settings > API
4. Request an API key (select "Developer")
5. Copy your API key

### 3. Start the Application

From the root directory:

```bash
npm start
```

This will start both the backend (port 5000) and frontend (port 3000) concurrently.

**Alternative: Start Manually**

Backend:
```bash
cd backend
node server.js
```

Frontend (in a new terminal):
```bash
cd frontend
npm start
```

### 4. Access the Application

Open your browser and go to:
```
http://localhost:3000
```

## 📖 How to Use

### First Time Setup

1. **Sign Up**: Create a new account with username, email, and password
2. **Populate Movies**: On the dashboard, click "Populate Movies" to fetch movies from TMDB (only needed once)
3. **Select Top 10**: Click "Select Top 10" and choose your 10 favorite movies
4. **Start Swiping**: Go to "Swipe Movies" and swipe right (like) or left (dislike)
5. **Get Recommendations**: View your personalized recommendations based on your preferences

### Features Walkthrough

#### Dashboard
- View your stats (likes, dislikes)
- Quick access to all features
- One-click movie database population

#### Top 10 Selection
- Search for movies by title
- Browse popular movies
- Select exactly 10 favorites
- Reorder your selections

#### Swipe Interface
- Tinder-style card swiping
- Drag cards or use buttons
- See your like/dislike count
- Smooth animations

#### Recommendations
- Personalized movie suggestions
- See your genre preferences
- View detailed movie information
- Refresh for updated recommendations

## 🏗️ Project Structure

```
WhatsYourMovie.app/
├── backend/
│   ├── database/
│   │   ├── db.js                 # Database initialization
│   │   └── movies.db             # SQLite database (auto-generated)
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── movies.js             # Movie routes
│   │   ├── top10.js              # Top 10 management
│   │   ├── swipes.js             # Swipe tracking
│   │   └── recommendations.js    # Recommendation algorithm
│   ├── server.js                 # Express server
│   ├── package.json
│   └── .env                      # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Signup.js         # Signup page
│   │   │   ├── Dashboard.js      # Main dashboard
│   │   │   ├── Top10Selection.js # Top 10 selector
│   │   │   ├── SwipeInterface.js # Swipe UI
│   │   │   └── Recommendations.js # Recommendations view
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── App.js                # Main app component
│   │   ├── App.css               # Global styles
│   │   ├── index.js              # React entry point
│   │   └── index.css             # Root styles
│   └── package.json
├── package.json                   # Root package
└── README.md
```

## 🎯 Recommendation Algorithm

The recommendation engine uses a hybrid approach:

1. **Genre Analysis**: Analyzes genres from your Top 10 movies (weighted 2x)
2. **Swipe History**: Considers your liked movies from swipes (weighted 1x)
3. **Rating Bonus**: Adds points for highly-rated movies
4. **Popularity Factor**: Considers movie popularity
5. **Personalized Scoring**: Combines all factors to create a personalized score
6. **Smart Filtering**: Excludes already-swiped and Top 10 movies

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get paginated movies
- `GET /api/movies/search?q=query` - Search movies
- `GET /api/movies/random` - Get random movies for swiping
- `POST /api/movies/populate` - Populate database from TMDB

### Top 10
- `GET /api/top10` - Get user's Top 10
- `POST /api/top10` - Save user's Top 10
- `GET /api/top10/status` - Check if user has Top 10

### Swipes
- `POST /api/swipes` - Record a swipe
- `GET /api/swipes/history` - Get swipe history
- `GET /api/swipes/stats` - Get swipe statistics

### Recommendations
- `GET /api/recommendations` - Get personalized recommendations

## 🎨 Design Features

- **Inter Font Family**: Modern, clean typography
- **Rounded Edges**: 24px border radius throughout
- **Gradient Accents**: Purple gradient (`#667eea` to `#764ba2`)
- **Smooth Animations**: All interactions animated
- **Responsive Design**: Works on desktop and mobile
- **Card-based Layout**: Clean, organized interface
- **Intuitive UX**: Easy navigation and clear actions

## 🐛 Troubleshooting

### Movies won't populate
- Check that your TMDB API key is correct in `backend/.env`
- Ensure you have internet connection
- Check backend console for error messages

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check that CORS is enabled in backend
- Clear browser cache and reload

### Database errors
- Delete `backend/database/movies.db` and restart the server
- Check file permissions on the database directory

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🤝 Contributing

This is a learning project. Feel free to fork and modify as you wish!

## 🎉 Enjoy!

Start swiping and discover your next favorite movie! 🍿

