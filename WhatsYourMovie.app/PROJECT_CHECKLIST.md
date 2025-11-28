# ✅ Project Setup Checklist

Use this checklist to ensure everything is set up correctly.

## Pre-Installation

- [ ] Node.js is installed (verify with: `node --version`)
- [ ] npm is installed (verify with: `npm --version`)
- [ ] You have internet connection
- [ ] All project files have been extracted/downloaded

## Initial Setup

- [ ] Ran `setup.bat` successfully
- [ ] All dependencies installed without errors
- [ ] Created `backend/.env` file
- [ ] Added TMDB API key to `.env` file
- [ ] Verified `.env` file has no extra spaces or typos

## First Run

- [ ] Ran `start.bat`
- [ ] Backend server started (check terminal window)
- [ ] Frontend server started (check terminal window)
- [ ] Browser opened to http://localhost:3000
- [ ] No error messages in terminals

## Account Creation

- [ ] Created an account (username, email, password)
- [ ] Successfully logged in
- [ ] Dashboard loaded correctly

## Database Setup

- [ ] Clicked "Populate Movies" on dashboard
- [ ] Received success message
- [ ] Movies database populated (check backend terminal)

## Top 10 Selection

- [ ] Navigated to "Select Top 10"
- [ ] Loaded popular movies
- [ ] Selected 10 movies
- [ ] Saved Top 10 successfully
- [ ] Returned to dashboard

## Swipe Feature

- [ ] Navigated to "Start Swiping"
- [ ] Movies are displaying
- [ ] Can swipe right (like)
- [ ] Can swipe left (dislike)
- [ ] Swipe count increases
- [ ] No errors in console

## Recommendations

- [ ] Navigated to "Recommendations"
- [ ] Personalized recommendations showing
- [ ] Genre preferences displayed
- [ ] Can click on movies for details
- [ ] Recommendations update after more swipes

## Final Verification

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Data persists after refresh
- [ ] Can logout and login again
- [ ] Database file exists: `backend/database/movies.db`

## Common Issues & Solutions

### Setup Issues

**Problem**: `npm not found`
- **Solution**: Install Node.js from nodejs.org and restart computer

**Problem**: `setup.bat` fails
- **Solution**: Run as Administrator, check internet connection

### Runtime Issues

**Problem**: Backend won't start
- **Solution**: Check port 5000 is not in use, verify `.env` exists

**Problem**: Movies won't populate
- **Solution**: Verify TMDB API key is correct, check internet

**Problem**: Frontend shows blank page
- **Solution**: Make sure backend is running first

**Problem**: CORS errors
- **Solution**: Ensure backend is on port 5000, frontend on port 3000

### Data Issues

**Problem**: Can't select Top 10
- **Solution**: Populate movies first

**Problem**: No swipe cards showing
- **Solution**: Complete Top 10 selection first

**Problem**: Recommendations empty
- **Solution**: Swipe more movies to build preferences

## File Structure Verification

Your project should have these key files:

```
WhatsYourMovie.app/
├── backend/
│   ├── .env                 ✅ Must create manually
│   ├── server.js            ✅ Auto-created
│   ├── package.json         ✅ Auto-created
│   ├── database/
│   │   ├── db.js           ✅ Auto-created
│   │   └── movies.db       ✅ Created on first run
│   ├── routes/             ✅ Auto-created
│   └── middleware/         ✅ Auto-created
├── frontend/
│   ├── src/                ✅ Auto-created
│   ├── public/             ✅ Auto-created
│   └── package.json        ✅ Auto-created
├── setup.bat               ✅ Auto-created
├── start.bat               ✅ Auto-created
└── README.md               ✅ Auto-created
```

## Success Indicators

You'll know everything is working when:

1. ✅ Both terminal windows show no errors
2. ✅ Backend says "Server running on http://localhost:5000"
3. ✅ Frontend opens in browser automatically
4. ✅ You can create an account and login
5. ✅ Movies populate successfully
6. ✅ You can select and save Top 10
7. ✅ Swipe interface works smoothly
8. ✅ Recommendations appear and make sense

## Performance Check

The app should feel:
- **Fast**: Pages load instantly
- **Smooth**: Swipe animations are fluid
- **Responsive**: Buttons react immediately
- **Stable**: No crashes or freezes

If experiencing slowness:
- Close other applications
- Check CPU/RAM usage
- Restart the servers
- Clear browser cache

## Next Steps

Once everything checks out:
- ✅ Explore all features
- ✅ Swipe at least 20 movies
- ✅ Check your recommendations
- ✅ Try different movie selections
- ✅ Enjoy discovering new movies! 🎬

---

**All items checked?** Congratulations! Your WhatsYourMovie app is fully operational! 🎉

