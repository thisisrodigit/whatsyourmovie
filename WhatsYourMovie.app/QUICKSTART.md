# ⚡ Quick Start Guide

## For Absolute Beginners

### What You Need
1. **Node.js** - Download from https://nodejs.org/ (get the LTS version)
2. **TMDB API Key** - Free from https://www.themoviedb.org/settings/api

### Installation (5 minutes)

#### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download the "LTS" version
3. Run the installer
4. Restart your computer

#### Step 2: Get TMDB API Key
1. Go to https://www.themoviedb.org/
2. Sign up for free
3. Go to Settings → API
4. Click "Request an API Key"
5. Choose "Developer"
6. Fill the form (you can put fake data for personal use)
7. Copy your API key

#### Step 3: Configure the App
1. Open the file `backend\.env` with Notepad
2. Find the line: `TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE`
3. Replace `YOUR_TMDB_API_KEY_HERE` with your actual API key
4. Save and close

#### Step 4: Run Setup
1. Find `setup.bat` in your project folder
2. Double-click it
3. Wait for it to finish (2-3 minutes)
4. Press any key when done

#### Step 5: Start the App
1. Find `start.bat` in your project folder
2. Double-click it
3. Wait 30 seconds
4. A browser window will open automatically
5. If not, open: http://localhost:3000

### First Use (2 minutes)

1. **Create Account**
   - Click "Sign Up"
   - Enter any username, email (can be fake), and password
   - Click "Sign Up"

2. **Load Movies**
   - On the dashboard, click "Populate Movies"
   - Wait 10 seconds
   - You should see "Movies populated successfully!"

3. **Select Top 10**
   - Click "Select Top 10"
   - Click "Show Popular Movies"
   - Click on 10 movies you like
   - Click "Save (10/10)"

4. **Start Swiping**
   - Go back to dashboard
   - Click "Start Swiping"
   - Swipe right ❤ for movies you like
   - Swipe left ✕ for movies you don't like

5. **Get Recommendations**
   - Click "View Recommendations"
   - See personalized movie suggestions!

## That's It! 🎉

You now have a working movie recommendation app!

### Tips
- Swipe more movies = better recommendations
- You can change your Top 10 anytime
- The app saves all your data locally
- Close the terminal windows to stop the app

### Having Issues?

**Can't find setup.bat?**
- Make sure you extracted all files from the zip
- Look in the main project folder

**Setup failed?**
- Make sure Node.js is installed
- Restart your computer
- Try running as Administrator (right-click → Run as Administrator)

**App won't open in browser?**
- Wait a full minute after running start.bat
- Manually open: http://localhost:3000
- Make sure no other apps are using ports 3000 or 5000

**No movies showing?**
- Check your TMDB API key is correct
- Make sure you have internet connection
- Try clicking "Populate Movies" again

**Still stuck?**
- Read the full README.md
- Check SETUP_INSTRUCTIONS.md for detailed troubleshooting

