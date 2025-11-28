# 🎬 START HERE - WhatsYourMovie Complete Guide

Welcome! This guide will get you up and running in under 10 minutes.

## What is This?

WhatsYourMovie is a movie recommendation app with:
- 🎯 Tinder-style swipe interface
- 🎬 Personalized recommendations
- 💾 Local database (no cloud needed)
- 🎨 Modern, beautiful UI

## Quick Start (3 Steps)

### Step 1: Install Node.js (5 minutes)

**Don't have Node.js?** → See [INSTALL_NODE.md](INSTALL_NODE.md) for detailed instructions.

**Quick check**: Open Command Prompt and type:
```bash
node --version
```

If you see a version number, you're good to go! ✅

### Step 2: Run Setup (2 minutes)

1. **Double-click** `setup.bat` in this folder
2. Wait for dependencies to install
3. Press any key when complete

**Troubleshooting**:
- If `setup.bat` fails, you need to install Node.js first
- Run as Administrator if you get permission errors

### Step 3: Start the App (1 minute)

1. **Double-click** `start.bat`
2. Two windows will open (backend & frontend)
3. Your browser will open automatically
4. If not, go to: **http://localhost:3000**

## First Time Setup (2 minutes)

Once the app opens:

### 1. Create Account
- Click "Sign Up"
- Enter any username, email, password
- Email can be fake (e.g., test@test.com)

### 2. Load Movies
On the dashboard, you have **two options**:

**Option A: Sample Movies (Instant) 🚀**
- Click "Use Sample Movies"
- Gets 10 classic movies instantly
- Perfect for testing!

**Option B: TMDB API (100+ Movies) 🎬**
- Requires TMDB API key (free)
- See [backend/ENV_SETUP.txt](backend/ENV_SETUP.txt)
- Click "Populate from TMDB"

### 3. Select Top 10
- Click "Select Top 10"
- Click "Show Popular Movies"
- Select 10 movies
- Click "Save"

### 4. Start Swiping!
- Click "Start Swiping"
- Swipe right ❤ = like
- Swipe left ✕ = dislike

### 5. Get Recommendations
- After swiping, click "Recommendations"
- See personalized suggestions!

## Folder Structure

```
WhatsYourMovie.app/
├── 📄 START_HERE.md          ← You are here!
├── 📄 QUICKSTART.md           ← Quick reference
├── 📄 README.md               ← Full documentation
├── 📄 INSTALL_NODE.md         ← Node.js installation
├── 📄 PROJECT_CHECKLIST.md    ← Setup verification
├── 🔧 setup.bat               ← Install dependencies
├── ▶️ start.bat               ← Start the app
├── 📁 backend/                ← Server code
│   ├── server.js             ← Main server
│   ├── routes/               ← API endpoints
│   └── database/             ← SQLite database
└── 📁 frontend/               ← React app
    └── src/                  ← App code
```

## Important Files

- **setup.bat** - Installs everything you need
- **start.bat** - Launches the app
- **backend/.env** - API key configuration (create this)
- **backend/ENV_SETUP.txt** - .env file instructions

## Features Overview

### 🔐 Authentication
- Sign up with username, email, password
- Secure JWT tokens
- Persistent login sessions

### 🎬 Movies Database
- TMDB API integration (100+ movies)
- Sample movies (10 classics)
- Search functionality
- High-quality posters

### 🎯 Top 10 Selection
- Choose your 10 favorite movies
- Visual selection interface
- Drag to reorder (coming soon)

### 👆 Swipe Interface
- Smooth Tinder-style cards
- Drag or click to swipe
- Real-time stats
- Unlimited movies

### ✨ Recommendations
- Smart algorithm
- Genre preference analysis
- Based on Top 10 + swipes
- Constantly improving

## Keyboard Shortcuts

Coming soon! For now, use mouse/touch.

## Browser Support

✅ Chrome (Recommended)
✅ Firefox
✅ Edge
✅ Safari
❌ Internet Explorer (not supported)

## System Requirements

- **OS**: Windows 10+, macOS, Linux
- **Node.js**: v14 or higher
- **RAM**: 2GB minimum
- **Storage**: 500MB for dependencies
- **Internet**: Required for setup & TMDB

## Troubleshooting

### App won't start?
1. Check Node.js is installed: `node --version`
2. Run `setup.bat` again
3. Restart your computer
4. Try running as Administrator

### No movies showing?
1. Click "Use Sample Movies" first
2. Or configure TMDB API key (see ENV_SETUP.txt)

### Blank screen?
1. Wait 30 seconds (first start is slow)
2. Check both terminal windows for errors
3. Refresh browser (Ctrl+R)
4. Try different browser

### Can't swipe?
1. Make sure you selected Top 10 first
2. Check that movies are loaded
3. Try restarting the app

## Getting Help

1. **Read the docs**: Check README.md for detailed info
2. **Check the checklist**: PROJECT_CHECKLIST.md
3. **Setup issues**: SETUP_INSTRUCTIONS.md
4. **Node.js problems**: INSTALL_NODE.md

## What to Do Next?

Once everything is working:

✅ **Customize**: Edit your Top 10 anytime
✅ **Explore**: Swipe through movies
✅ **Discover**: Check recommendations
✅ **Enjoy**: Find your next favorite movie!

## Tips & Tricks

- **More swipes = better recommendations**: The more you swipe, the smarter the algorithm becomes
- **Update Top 10**: Your taste changes! Update your top 10 regularly
- **Try sample first**: Use sample movies to test before getting TMDB API
- **Mobile friendly**: Works great on phones/tablets too

## Advanced Setup

Want to use TMDB API for 100+ movies?

1. Get free API key: https://www.themoviedb.org/settings/api
2. Create `backend/.env` file
3. Add: `TMDB_API_KEY=your_key_here`
4. Restart the app
5. Click "Populate from TMDB"

See [backend/ENV_SETUP.txt](backend/ENV_SETUP.txt) for detailed instructions.

## Tech Stack

Built with modern technologies:
- **Frontend**: React 18, React Router
- **Backend**: Node.js, Express
- **Database**: SQLite
- **API**: TMDB (optional)
- **Auth**: JWT, bcrypt

## Project Status

✅ Fully functional
✅ All features working
✅ Ready to use
✅ Sample data included

## Contributing

This is a learning project - feel free to modify!

## License

MIT License - Use freely for learning and personal projects.

---

## Ready? Let's Go! 🚀

1. ✅ Node.js installed?
2. ✅ Run `setup.bat`
3. ✅ Run `start.bat`
4. ✅ Open http://localhost:3000
5. ✅ Enjoy!

Have fun discovering movies! 🍿🎬

---

**Need Help?** Open an issue or check the documentation files.

**Enjoying the app?** Star the repo and share with friends!

