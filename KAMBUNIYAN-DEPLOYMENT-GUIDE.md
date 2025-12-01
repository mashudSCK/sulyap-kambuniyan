# 🌿 Sulyap: Kambuniyan Edition - Deployment Guide

## SKSU Kambuniyan Week 2025 — Sulyap Festival Edition

**"Isang sulyap sa pagkakaisa ng pitong campus."**

---

## 📦 Complete File List

### New Kambuniyan Edition Files (All created):
```
frontend/
├── index-kambuniyan.html       ✅ Main HTML with Kambuniyan theme
├── styles-kambuniyan.css       ✅ Kambuniyan themed styles
├── app-kambuniyan.js           ✅ JavaScript with shout-out functionality
├── add_shout.php               ✅ PHP endpoint to add shout-outs
├── get_shouts.php              ✅ PHP endpoint to get shout-outs
└── shouts.json                 ✅ Shout-outs storage (empty array)
```

---

## 🎨 Theme Overview

### Color Palette (Kambuniyan Edition):
- **Green**: `#0B6E4F` (Primary)
- **Gold**: `#F2C94C` (Accent)
- **Warm Earth**: `#DDB892` (Borders)
- **Rice Paper**: `#FFF9ED` (Background)
- **Deep Forest**: `#1A1A1A` (Text)

### Design Features:
- ✅ Kambuniyan Week 2025 banner at top
- ✅ Filipino-inspired minimalist design
- ✅ Subtle tribal pattern background (low opacity)
- ✅ Green/Gold gradient buttons
- ✅ "Kambuniyan Edition 2025" badge
- ✅ Tagalog placeholder text
- ✅ Mobile-responsive layout

---

## 📣 Shout-Out Wall Features

### Functionality:
- ✅ **Submit shout-outs**: Users can post messages (max 200 chars)
- ✅ **Auto-refresh**: Every 10 seconds
- ✅ **JSON storage**: No database required
- ✅ **Security**: HTML sanitization & XSS prevention
- ✅ **Validation**: Empty messages blocked
- ✅ **Time stamps**: Shows "just now", "5m ago", etc.
- ✅ **Limit**: Max 100 shout-outs stored
- ✅ **Character counter**: Live count with color warnings

---

## 🚀 Installation Instructions

### Option 1: XAMPP (Local Development)

1. **Copy files to your XAMPP htdocs folder**:
   ```
   C:\xampp\htdocs\sulyap-main\frontend\
   ```

2. **Set file permissions for shouts.json**:
   - Right-click `shouts.json` → Properties
   - Security tab → Edit → Add "Everyone" → Full Control
   - OR via PHP: `chmod('shouts.json', 0666);`

3. **Start XAMPP**:
   - Start Apache (for PHP)
   - Start your Node.js backend server

4. **Update file references**:
   - Rename `index-kambuniyan.html` to `index.html`
   - OR update backend to serve `index-kambuniyan.html`

5. **Test the shout-out wall**:
   - Open browser: `http://localhost:3000`
   - Submit a test shout-out
   - Check if `shouts.json` has content

---

### Option 2: Render Deployment (Production)

Since Render doesn't support PHP by default, you have two options:

#### **A. Use Node.js instead of PHP** (Recommended)

Replace PHP endpoints with Node.js:

**File: `backend/shout-endpoints.js`** (Create this)
```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const shoutsFile = path.join(__dirname, '../frontend/shouts.json');

// Ensure shouts.json exists
if (!fs.existsSync(shoutsFile)) {
  fs.writeFileSync(shoutsFile, '[]');
}

// GET all shout-outs
router.get('/get_shouts.php', (req, res) => {
  try {
    const data = fs.readFileSync(shoutsFile, 'utf8');
    const shouts = JSON.parse(data);
    res.json({ success: true, shouts, count: shouts.length });
  } catch (error) {
    res.json({ success: true, shouts: [], count: 0 });
  }
});

// POST new shout-out
router.post('/add_shout.php', (req, res) => {
  const { text } = req.body;
  
  if (!text || text.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Text is required' });
  }
  
  if (text.length > 200) {
    return res.status(400).json({ success: false, message: 'Text too long' });
  }
  
  try {
    // Read existing shouts
    let shouts = [];
    if (fs.existsSync(shoutsFile)) {
      const data = fs.readFileSync(shoutsFile, 'utf8');
      shouts = JSON.parse(data);
    }
    
    // Create new shout
    const newShout = {
      text: text.trim().replace(/[<>]/g, ''), // Basic sanitization
      timestamp: new Date().toISOString(),
      id: `shout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Add to beginning
    shouts.unshift(newShout);
    
    // Limit to 100
    if (shouts.length > 100) {
      shouts = shouts.slice(0, 100);
    }
    
    // Save
    fs.writeFileSync(shoutsFile, JSON.stringify(shouts, null, 2));
    
    res.json({ success: true, message: 'Posted!', shout: newShout });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
```

**Update `backend/server.js`**:
```javascript
// Add near the top with other requires
const shoutRouter = require('./shout-endpoints');

// Add with other app.use() calls
app.use('/', shoutRouter);
```

#### **B. Deploy PHP separately**

Use a free PHP hosting service like:
- **InfinityFree** (free PHP hosting)
- **000webhost** (free PHP + MySQL)
- **Heroku** (with PHP buildpack)

Upload ONLY the PHP files and shouts.json, then update your frontend to point to that URL:

```javascript
// In app-kambuniyan.js, replace:
const response = await fetch('get_shouts.php');

// With:
const response = await fetch('https://your-php-host.com/get_shouts.php');
```

---

## 📁 File Placement on Render

If using Node.js option (recommended):

```
backend/
├── server.js                 (updated with shout routes)
├── shout-endpoints.js        (new file with endpoints)
└── package.json

frontend/
├── index.html                (rename from index-kambuniyan.html)
├── styles.css                (rename from styles-kambuniyan.css)
├── app.js                    (rename from app-kambuniyan.js)
├── shouts.json               (create with [])
└── assets/
    └── sounds/
```

---

## 🔧 Configuration Checklist

### Before going live:

- [ ] **File permissions**: Ensure `shouts.json` is writable
- [ ] **CORS**: Check CORS headers if using separate PHP hosting
- [ ] **Test endpoints**:
  - `GET /get_shouts.php` → Returns `{"success":true,"shouts":[]}`
  - `POST /add_shout.php` with `{"text":"test"}` → Returns success
- [ ] **Auto-refresh**: Verify 10-second refresh works
- [ ] **Security**: Confirm HTML tags are stripped
- [ ] **Mobile**: Test on phone (responsive design)
- [ ] **Banner**: Verify Kambuniyan banner appears at top
- [ ] **Colors**: Check green/gold theme consistency

---

## 🎯 Testing Guide

### 1. Test Shout-Out Submission
```bash
# Using curl or Postman:
curl -X POST http://localhost:3000/add_shout.php \
  -H "Content-Type: application/json" \
  -d '{"text":"Mabuhay SKSU Kambuniyan 2025!"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Shout-out posted successfully!",
  "shout": {
    "text": "Mabuhay SKSU Kambuniyan 2025!",
    "timestamp": "2025-12-02 10:30:45",
    "id": "shout_abc123"
  }
}
```

### 2. Test Get Shout-Outs
```bash
curl http://localhost:3000/get_shouts.php
```

Expected response:
```json
{
  "success": true,
  "shouts": [
    {
      "text": "Mabuhay SKSU Kambuniyan 2025!",
      "timestamp": "2025-12-02 10:30:45",
      "id": "shout_abc123"
    }
  ],
  "count": 1
}
```

### 3. Test Character Limit
Submit message with 201 characters → Should return error

### 4. Test HTML Sanitization
Submit: `<script>alert('xss')</script>` → Should be escaped

### 5. Test Auto-Refresh
Open page → Submit shout → Wait 10 seconds → Should auto-update

---

## 🎨 Customization Options

### Change Event Details
Edit banner in `index-kambuniyan.html`:
```html
<h2 class="banner-title">SKSU Kambuniyan Week 2025</h2>
<p class="banner-subtitle">Isang sulyap sa pagkakaisa ng pitong campus</p>
```

### Adjust Refresh Interval
In `app-kambuniyan.js`:
```javascript
// Change 10000 (10 seconds) to desired milliseconds
setInterval(() => {
  loadShoutouts();
}, 10000);
```

### Modify Shout-Out Limit
In `add_shout.php` or `shout-endpoints.js`:
```javascript
// Change 100 to desired limit
if (shouts.length > 100) {
  shouts = shouts.slice(0, 100);
}
```

### Update Colors
In `styles-kambuniyan.css`:
```css
:root {
  --green: #0B6E4F;      /* Your custom green */
  --gold: #F2C94C;       /* Your custom gold */
  --warm-earth: #DDB892; /* Your custom earth tone */
}
```

---

## 🐛 Troubleshooting

### Shout-outs not appearing?
1. Check browser console for errors
2. Verify `shouts.json` exists and is writable
3. Test endpoints manually (see Testing Guide)
4. Check file permissions (should be 666 or similar)

### "Permission denied" error?
```bash
# Linux/Mac:
chmod 666 frontend/shouts.json

# Windows: Right-click → Properties → Security → Edit permissions
```

### CORS errors?
Add to PHP files:
```php
header('Access-Control-Allow-Origin: *');
```

Or in Node.js server:
```javascript
app.use(cors());
```

### Auto-refresh not working?
- Check browser console for JavaScript errors
- Verify network tab shows requests every 10 seconds
- Ensure page is focused (some browsers pause timers)

---

## 📱 Mobile Optimization

The design is fully responsive with breakpoints at:
- **Mobile**: < 768px
- **Desktop**: ≥ 769px

Features:
- Touch-friendly buttons (44px minimum)
- Scrollable shout-out container
- Responsive font sizes
- Optimized banner for small screens

---

## 🔐 Security Features Implemented

✅ **HTML Sanitization**: `htmlspecialchars()` and `strip_tags()`
✅ **XSS Prevention**: All user input escaped
✅ **Character Limits**: Max 200 characters enforced
✅ **Input Validation**: Empty messages rejected
✅ **File Locking**: `LOCK_EX` prevents race conditions
✅ **Method Restrictions**: Only POST/GET allowed
✅ **No SQL Injection**: JSON file, not database

---

## 🌟 Feature Summary

### Kambuniyan Theme:
- ✅ Event banner with school branding
- ✅ Green/Gold color scheme
- ✅ Tribal pattern background
- ✅ Filipino text and placeholder
- ✅ Cultural accents (stars, patterns)
- ✅ Kambuniyan Edition badge

### Shout-Out Wall:
- ✅ Public message board
- ✅ JSON-based storage (no database)
- ✅ Auto-refresh every 10 seconds
- ✅ Character counter
- ✅ Time stamps ("5m ago" format)
- ✅ Limit to 100 messages
- ✅ Security & validation
- ✅ Mobile responsive

### Chat Features (Preserved):
- ✅ Anonymous 1-on-1 chat
- ✅ Reply to messages
- ✅ Typing indicators
- ✅ Feedback system
- ✅ Online counter
- ✅ Sound notifications

---

## 📊 Performance Notes

- **JSON file size**: ~10KB for 100 shout-outs
- **Load time**: < 1s for reading JSON
- **Auto-refresh**: Every 10s (configurable)
- **Mobile data**: ~2KB per refresh
- **Browser support**: All modern browsers

---

## 🎓 Integration with Existing Sulyap

### Keep both versions:
1. Keep original as `index.html`
2. Kambuniyan as `index-kambuniyan.html`
3. Add version switcher button

### Replace completely:
1. Backup original files
2. Rename Kambuniyan files:
   - `index-kambuniyan.html` → `index.html`
   - `styles-kambuniyan.css` → `styles.css`
   - `app-kambuniyan.js` → `app.js`

### Hybrid approach:
1. Use Kambuniyan theme ONLY during event week
2. Schedule automatic switch (cron job or date check)

---

## 📞 Support & Credits

**Created for**: SKSU Kambuniyan Week 2025  
**Theme**: Filipino-inspired minimalist design  
**Tech Stack**: HTML, CSS, JavaScript, PHP, JSON  
**Hosting**: Render-compatible (Node.js or PHP)  

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Copy all files to frontend/
# 2. Make shouts.json writable
chmod 666 frontend/shouts.json

# 3. Option A: Use Node.js (create shout-endpoints.js)
# 3. Option B: Use PHP (ensure PHP installed)

# 4. Test locally
npm start  # or start XAMPP

# 5. Deploy to Render
git add .
git commit -m "Add Kambuniyan Edition"
git push
```

**Visit**: `http://localhost:3000`  
**Submit test shout**: "Mabuhay SKSU! 🎉"  
**Check**: `shouts.json` should have your message  

---

## ✨ You're all set!

**Mabuhay ang SKSU Kambuniyan Week 2025!** 🌿🎉

For questions or issues, check the Troubleshooting section above.
