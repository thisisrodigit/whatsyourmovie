# 🧪 Testing Guide

This guide helps verify that everything is working correctly.

## Automated Tests (Future)

Unit tests and integration tests are planned for future releases.

## Manual Testing Checklist

### 1. Backend Server Tests

**Start the backend:**
```bash
cd backend
node server.js
```

**Expected output:**
```
Initializing database...
✅ Database initialized successfully
🚀 Server running on http://localhost:5000
```

**Test health endpoint:**
Open browser to: http://localhost:5000/api/health
Expected: `{"status":"ok","message":"Server is running"}`

### 2. Frontend Tests

**Start the frontend:**
```bash
cd frontend
npm start
```

**Expected:**
- Compiles without errors
- Opens browser automatically
- Shows login page

### 3. Authentication Flow

**Test Signup:**
1. Click "Sign up"
2. Enter:
   - Username: testuser
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"
4. Should redirect to dashboard

**Test Login:**
1. Logout
2. Click "Sign in"
3. Enter credentials
4. Should login successfully

**Test Token Persistence:**
1. Login
2. Refresh browser (F5)
3. Should stay logged in

### 4. Movies Database

**Test Sample Movies:**
1. On dashboard, click "Use Sample Movies"
2. Should see success message
3. Should get 10 movies

**Test TMDB API (if configured):**
1. Add TMDB_API_KEY to backend/.env
2. Click "Populate from TMDB"
3. Should see success message
4. Should get 100+ movies

**Test Movie Search:**
1. Go to "Select Top 10"
2. Enter "Matrix" in search
3. Should show matching movies

### 5. Top 10 Selection

**Test Selection:**
1. Navigate to "Select Top 10"
2. Click "Show Popular Movies"
3. Should see movie grid
4. Click on movies to select
5. Counter should update (X/10)

**Test Save:**
1. Select exactly 10 movies
2. Click "Save"
3. Should see success message
4. Should redirect to dashboard

**Test View Top 10:**
1. Click "View Top 10" button
2. Should show selected movies
3. Should show rank numbers

### 6. Swipe Interface

**Test Card Display:**
1. Navigate to "Swipe"
2. Should show movie card
3. Should have movie poster, title, year
4. Should show description

**Test Swipe Right (Like):**
1. Click heart button OR drag right
2. Card should animate away
3. Likes counter should increase
4. Next card should appear

**Test Swipe Left (Dislike):**
1. Click X button OR drag left
2. Card should animate away
3. Dislikes counter should increase
4. Next card should appear

**Test Drag Functionality:**
1. Click and hold on card
2. Drag left/right
3. Should see like/dislike badge
4. Release to swipe

**Test Mobile Touch:**
1. On mobile device or responsive mode
2. Touch and drag cards
3. Should work smoothly

### 7. Recommendations

**Test Basic Recommendations:**
1. After swiping 5+ movies
2. Navigate to "Recommendations"
3. Should show recommended movies
4. Should show genre preferences

**Test Algorithm:**
1. Like action movies
2. Check recommendations
3. Should suggest more action movies

**Test Movie Details:**
1. Click on recommended movie
2. Should open modal
3. Should show full details
4. Close modal should work

### 8. Data Persistence

**Test Data Saves:**
1. Create account
2. Select Top 10
3. Swipe some movies
4. Close browser completely
5. Reopen and login
6. All data should persist

**Test Multiple Users:**
1. Create User A
2. Select Top 10 for User A
3. Logout
4. Create User B
5. Select different Top 10
6. Login as User A
7. Should see User A's data

### 9. Error Handling

**Test Invalid Login:**
1. Enter wrong password
2. Should show error message
3. Should not login

**Test Duplicate Email:**
1. Sign up with existing email
2. Should show error message

**Test Empty Top 10:**
1. Go to Top 10
2. Try to save with < 10 movies
3. Should show error

**Test No Movies:**
1. Fresh install
2. Try to swipe without loading movies
3. Should show empty state

### 10. UI/UX Tests

**Test Responsive Design:**
1. Resize browser window
2. Test on different sizes
3. Should adapt gracefully

**Test Navigation:**
1. All buttons should work
2. Back buttons should work
3. Links should work

**Test Loading States:**
1. All buttons should show loading state
2. Spinners should appear when loading

**Test Error Messages:**
1. Error messages should be clear
2. Should disappear after action

## Performance Tests

### Load Time
- Initial page load: < 3 seconds
- Subsequent loads: < 1 second
- API calls: < 500ms

### Swipe Performance
- Swipe animation: Smooth 60fps
- Card load time: Instant
- No lag or stutter

### Database
- Query time: < 100ms
- Insert time: < 50ms
- Search time: < 200ms

## Known Issues

None at this time. Please report any bugs!

## Test Results Template

```
Test Date: ___________
Tester: ___________

✅ Backend starts without errors
✅ Frontend starts without errors
✅ Can create account
✅ Can login/logout
✅ Movies populate
✅ Can select Top 10
✅ Can save Top 10
✅ Swipe interface works
✅ Recommendations appear
✅ Data persists
✅ Mobile responsive
✅ No console errors

Issues Found:
1. _________________
2. _________________

Notes:
_________________
```

## Automated Testing (Future)

Planned test coverage:
- [ ] Unit tests for all routes
- [ ] Integration tests for flows
- [ ] E2E tests with Cypress
- [ ] Performance benchmarks
- [ ] Load testing
- [ ] Security testing

## Browser Testing Matrix

Tested on:
- ✅ Chrome 120+ (Windows/Mac/Linux)
- ✅ Firefox 120+ (Windows/Mac/Linux)
- ✅ Edge 120+ (Windows)
- ✅ Safari 17+ (Mac)
- ⚠️ Mobile Safari (iOS) - Some animations may vary
- ⚠️ Chrome Mobile (Android) - Touch gestures work

## Reporting Issues

When reporting issues, include:
1. Operating system
2. Node.js version
3. Browser and version
4. Steps to reproduce
5. Expected vs actual behavior
6. Screenshots if applicable
7. Console errors

## Success Criteria

The app is working correctly if:
1. ✅ All features work as described
2. ✅ No console errors
3. ✅ Smooth animations
4. ✅ Fast load times
5. ✅ Data persists
6. ✅ Responsive on mobile
7. ✅ Intuitive to use

---

**All tests passing?** Great! The app is ready to use! 🎉

**Some tests failing?** Check SETUP_INSTRUCTIONS.md for troubleshooting.

