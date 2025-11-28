# 🚀 Setup Instructions for WhatsYourMovie

## Step-by-Step Setup Guide

### 1. Verify Node.js Installation

First, make sure Node.js is installed on your system.

Open PowerShell or Command Prompt and run:
```bash
node --version
npm --version
```

If you don't see version numbers, install Node.js from: https://nodejs.org/

### 2. Install Dependencies

#### Option A: Using the Batch Script (Easiest)
1. Double-click `setup.bat`
2. Wait for all dependencies to install
3. Press any key when complete

#### Option B: Manual Installation
Open Command Prompt or PowerShell in the project folder and run:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Configure TMDB API Key

1. Go to https://www.themoviedb.org/
2. Create a free account (if you don't have one)
3. Navigate to: Settings → API
4. Request an API key (select "Developer")
5. Copy your API key

6. Open `backend/.env` in a text editor
7. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key:

```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
TMDB_API_KEY=abc123your_actual_api_key_here
```

### 4. Start the Application

#### Option A: Using the Batch Script (Easiest)
1. Double-click `start.bat`
2. Two terminal windows will open (backend and frontend)
3. Wait for both to finish starting (~30 seconds)
4. Your browser should open automatically to http://localhost:3000
5. If not, manually open: http://localhost:3000

#### Option B: Manual Start
Open **TWO** separate Command Prompt or PowerShell windows:

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Wait for both to start, then open http://localhost:3000 in your browser.

### 5. First-Time Usage

Once the app opens in your browser:

1. **Sign Up**: Create an account with:
   - Username (any name you like)
   - Email (can be fake for local testing: test@example.com)
   - Password (at least 6 characters)

2. **Populate Movies Database**:
   - Click "Populate Movies" on the dashboard
   - Wait 5-10 seconds for movies to load from TMDB
   - You should see a success message

3. **Select Your Top 10**:
   - Click "Select Top 10"
   - Click "Show Popular Movies" to see options
   - Click on movies to select them (you need exactly 10)
   - Once you have 10 selected, click "Save"

4. **Start Swiping**:
   - Return to dashboard
   - Click "Start Swiping"
   - Swipe right (❤) for movies you like
   - Swipe left (✕) for movies you don't like
   - Or drag the cards!

5. **View Recommendations**:
   - After swiping a few movies, click "View Recommendations"
   - See personalized movie suggestions based on your preferences!

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in your PATH
- Download and install from: https://nodejs.org/
- Restart your terminal/computer after installing

### "Module not found" errors
- Dependencies not installed properly
- Run `setup.bat` again or manually install dependencies
- Make sure you're in the correct directory

### Backend won't start
- Port 5000 might be in use
- Change PORT in `backend/.env` to 5001 or another number
- Also update API_URL in `frontend/src/services/api.js` to match

### Movies won't populate
- Check your TMDB API key is correct in `backend/.env`
- Make sure you have internet connection
- Look at the backend terminal for error messages

### Frontend shows errors
- Make sure backend is running first
- Check that backend is on port 5000
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser

### "CORS" errors
- Both servers must be running
- Frontend must be on port 3000, backend on port 5000
- Restart both servers

## Stopping the Application

### If using batch scripts:
- Close both terminal windows that opened

### If started manually:
- Press `Ctrl + C` in each terminal window
- Type `Y` if asked to terminate batch job

## Need Help?

Check the main README.md for more detailed information about:
- Project structure
- API endpoints
- Features documentation
- Technology stack

## System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **Node.js**: Version 14 or higher
- **RAM**: At least 2GB free
- **Disk Space**: ~500MB for dependencies
- **Browser**: Chrome, Firefox, Edge, or Safari (latest version)

Enjoy discovering movies! 🎬🍿

