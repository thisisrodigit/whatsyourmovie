# ⚡ Quick Reference Card

## 🚀 Setup Commands

```bash
# Install everything
Double-click: setup.bat

# Start the app
Double-click: start.bat

# Manual backend start
cd backend
node server.js

# Manual frontend start
cd frontend
npm start
```

## 🌐 URLs

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend** | http://localhost:5000 |
| **API Health** | http://localhost:5000/api/health |

## 📂 Important Files

| File | Purpose |
|------|---------|
| `setup.bat` | Install dependencies |
| `start.bat` | Launch app |
| `backend/.env` | API configuration |
| `backend/server.js` | Backend server |
| `frontend/src/App.js` | Main React app |
| `START_HERE.md` | Getting started |

## 🔑 Default Credentials

For testing:
```
Username: testuser
Email: test@test.com
Password: test123
```

## 🎬 Feature Checklist

### First Run
- [ ] Install Node.js
- [ ] Run `setup.bat`
- [ ] Run `start.bat`
- [ ] Create account
- [ ] Load movies
- [ ] Select Top 10

### Daily Use
- [ ] Login
- [ ] Swipe movies
- [ ] Check recommendations
- [ ] Update Top 10 (optional)

## 🎨 Design Specs

```css
/* Colors */
Primary: #667eea → #764ba2
Background: Linear gradient purple
Cards: #ffffff
Text: #1f2937, #6b7280

/* Typography */
Font: Inter (Google Fonts)
Weights: 300, 400, 500, 600, 700, 800

/* Spacing */
Border Radius: 24px (cards), 12px (buttons)
Grid: 8px base unit
Shadows: Layered elevation
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Backend | Node.js + Express |
| Database | SQLite |
| Auth | JWT + bcrypt |
| API | TMDB (optional) |
| Styling | Custom CSS |

## 📡 API Quick Reference

### Auth
```javascript
POST /api/auth/signup { username, email, password }
POST /api/auth/login { email, password }
```

### Movies
```javascript
GET  /api/movies?page=1&limit=20
GET  /api/movies/search?q=matrix
GET  /api/movies/random?limit=50
POST /api/movies/populate
POST /api/dev/populate-sample
```

### Top 10
```javascript
GET  /api/top10
POST /api/top10 { movies: [id1, id2, ...] }
GET  /api/top10/status
```

### Swipes
```javascript
POST /api/swipes { movie_id, action: 'like'|'dislike' }
GET  /api/swipes/history
GET  /api/swipes/stats
```

### Recommendations
```javascript
GET /api/recommendations?limit=20
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| npm not found | Install Node.js |
| Port in use | Change PORT in .env |
| No movies | Click "Use Sample Movies" |
| Can't swipe | Select Top 10 first |
| Blank screen | Wait 30 sec, refresh |
| Login fails | Check credentials |

## ⌨️ Keyboard Shortcuts

Coming soon!

## 📱 Mobile Support

✅ Touch gestures work
✅ Responsive design
✅ Works on all devices

## 🔐 Security Notes

- Passwords: Hashed with bcrypt
- Auth: JWT tokens (7 day expiry)
- Database: Local SQLite file
- No cloud storage

## 📊 Database Tables

```sql
users         → User accounts
movies        → Movie database
user_top10    → User's favorite movies
swipes        → Like/dislike history
```

## 🎯 Recommendation Algorithm

1. Analyze Top 10 (2x weight)
2. Analyze likes (1x weight)
3. Calculate genre preferences
4. Score all movies
5. Return top recommendations

## 📈 Performance Tips

- First load: ~30 seconds
- Subsequent: Instant
- More swipes = Better recommendations
- Update Top 10 for better results

## 🆘 Help Resources

| Issue | File to Read |
|-------|-------------|
| General | START_HERE.md |
| Setup | SETUP_INSTRUCTIONS.md |
| Node.js | INSTALL_NODE.md |
| Testing | TESTING_GUIDE.md |
| Overview | README.md |

## 🎉 Success Indicators

✅ Both terminals show "Server running"
✅ Browser opens to login page
✅ Can create account
✅ Movies load
✅ Can swipe smoothly
✅ Recommendations appear

## 🔄 Update/Reset

```bash
# Update code
git pull

# Reinstall dependencies
setup.bat

# Reset database
Delete: backend/database/movies.db
Restart: start.bat

# Clear cache
Ctrl + Shift + Delete in browser
```

## 📞 Support

1. Check documentation files
2. Verify Node.js installed
3. Run setup.bat again
4. Restart computer
5. Try different browser

## ✨ Pro Tips

💡 Use sample movies for instant testing
💡 Swipe 20+ movies for best recommendations
💡 Update Top 10 regularly
💡 Works offline after initial setup
💡 Mobile friendly - use on phone
💡 Multiple accounts supported
💡 Data persists between sessions

---

## 📌 Most Used Commands

```bash
# Setup
setup.bat

# Start
start.bat

# Stop
Close both terminal windows

# Check Node
node --version
npm --version

# Access
http://localhost:3000
```

## 🎬 Quick Start (30 seconds)

1. `setup.bat` → Wait 2 min
2. `start.bat` → Wait 30 sec
3. Sign up → Use any credentials
4. "Use Sample Movies" → Instant
5. "Select Top 10" → Pick 10 movies
6. "Start Swiping" → Swipe away!
7. "Recommendations" → See suggestions

**That's it!** You're ready to discover movies! 🍿

---

📖 **Need More Details?** Check START_HERE.md

🆘 **Having Issues?** Check SETUP_INSTRUCTIONS.md

🎯 **Want Full Docs?** Check README.md

