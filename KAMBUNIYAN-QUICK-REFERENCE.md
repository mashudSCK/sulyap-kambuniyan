# 🌿 Sulyap: Kambuniyan Edition - Quick Reference

## 🎯 File Mapping

| Original File | Kambuniyan Version | Purpose |
|--------------|-------------------|---------|
| `index.html` | `index-kambuniyan.html` | Main HTML with theme |
| `styles.css` | `styles-kambuniyan.css` | Kambuniyan colors/design |
| `app.js` | `app-kambuniyan.js` | JS with shout-out logic |
| N/A | `add_shout.php` | Add shout endpoint (PHP) |
| N/A | `get_shouts.php` | Get shouts endpoint (PHP) |
| N/A | `shout-endpoints.js` | Shout endpoints (Node.js) |
| N/A | `shouts.json` | Shout storage file |

---

## 🎨 Color Reference

```css
/* Copy-paste ready */
--green: #0B6E4F;          /* Primary buttons, headers */
--gold: #F2C94C;           /* Badges, accents */
--warm-earth: #DDB892;     /* Borders, dividers */
--rice-paper: #FFF9ED;     /* Background */
--deep-forest: #1A1A1A;    /* Text */
```

---

## 📣 Shout-Out API

### Add Shout-Out
```javascript
// POST /add_shout.php
fetch('add_shout.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Your message' })
})
```

**Request:**
```json
{
  "text": "Mabuhay SKSU!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Shout-out posted successfully!",
  "shout": {
    "text": "Mabuhay SKSU!",
    "timestamp": "2025-12-02 10:30:45",
    "id": "shout_abc123"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Text too long (max 200 characters)"
}
```

### Get All Shout-Outs
```javascript
// GET /get_shouts.php
fetch('get_shouts.php')
  .then(r => r.json())
  .then(data => console.log(data.shouts))
```

**Response:**
```json
{
  "success": true,
  "shouts": [
    {
      "text": "Excited for Kambuniyan!",
      "timestamp": "2025-12-02 10:30:45",
      "id": "shout_abc123"
    }
  ],
  "count": 1
}
```

---

## 🔧 Common Customizations

### Change Banner Text
```html
<!-- index-kambuniyan.html line 17-20 -->
<h2 class="banner-title">YOUR EVENT NAME</h2>
<p class="banner-subtitle">Your tagline here</p>
```

### Change Primary Color
```css
/* styles-kambuniyan.css line 13 */
--green: #YourColor;
```

### Change Refresh Interval
```javascript
// app-kambuniyan.js line ~270
setInterval(() => {
  loadShoutouts();
}, 10000); // Change to 5000 for 5 seconds
```

### Change Character Limit
```javascript
// shout-endpoints.js line 51
if (text.length > 200) { // Change 200 to your limit
```

### Change Max Shout-Outs Stored
```javascript
// shout-endpoints.js line 83
if (shouts.length > 100) { // Change 100 to your limit
  shouts = shouts.slice(0, 100);
}
```

---

## 🚨 Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| "Text is required" | Empty message | Enter text before submitting |
| "Text too long" | > 200 characters | Shorten message |
| "Failed to save" | Permission error | Check file permissions |
| "Method not allowed" | Wrong HTTP method | Use POST for add, GET for get |

---

## 📁 File Permissions

### Windows (XAMPP)
```
Right-click shouts.json → Properties → Security
→ Edit → Add "Everyone" → Full Control
```

### Linux/Mac
```bash
chmod 666 frontend/shouts.json
```

### Check Permissions
```bash
# Linux/Mac
ls -l frontend/shouts.json
# Should show: -rw-rw-rw-

# Windows PowerShell
Get-Acl frontend/shouts.json | Format-List
```

---

## 🧪 Testing Commands

### Test Add Shout (cURL)
```bash
curl -X POST http://localhost:3000/add_shout.php \
  -H "Content-Type: application/json" \
  -d '{"text":"Test message"}'
```

### Test Get Shouts (cURL)
```bash
curl http://localhost:3000/get_shouts.php
```

### Test with Browser Console
```javascript
// Add shout
fetch('add_shout.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Test!' })
}).then(r => r.json()).then(console.log)

// Get shouts
fetch('get_shouts.php').then(r => r.json()).then(console.log)
```

---

## 🎯 Deployment Options

### Option 1: Keep Both Versions
```
frontend/
├── index.html              (Original Sulyap)
├── index-kambuniyan.html   (Kambuniyan Edition)
├── styles.css
├── styles-kambuniyan.css
├── app.js
└── app-kambuniyan.js
```
Access: `http://yourdomain.com/index-kambuniyan.html`

### Option 2: Replace Original
```bash
# Backup first
mv frontend/index.html frontend/index-original.html
mv frontend/styles.css frontend/styles-original.css
mv frontend/app.js frontend/app-original.js

# Rename Kambuniyan files
mv frontend/index-kambuniyan.html frontend/index.html
mv frontend/styles-kambuniyan.css frontend/styles.css
mv frontend/app-kambuniyan.js frontend/app.js
```

### Option 3: Conditional Switch
```javascript
// In index.html, add at top:
<script>
const isKambuniyanWeek = new Date() >= new Date('2025-12-01') && 
                          new Date() <= new Date('2025-12-07');
if (isKambuniyanWeek) {
  window.location.href = 'index-kambuniyan.html';
}
</script>
```

---

## 📊 shouts.json Structure

```json
[
  {
    "text": "First message",
    "timestamp": "2025-12-02 10:00:00",
    "id": "shout_1733134800_abc123"
  },
  {
    "text": "Second message",
    "timestamp": "2025-12-02 09:30:00",
    "id": "shout_1733133000_def456"
  }
]
```

**Notes:**
- Array of shout objects
- Sorted newest first (newest at index 0)
- Each shout has: text, timestamp, id
- Max 100 shouts auto-maintained
- Empty file starts as: `[]`

---

## 🔍 Debugging Checklist

**Shout-outs not working?**

1. ✅ Check browser console for errors
2. ✅ Verify `shouts.json` exists
3. ✅ Check file permissions (666)
4. ✅ Test endpoints manually (cURL)
5. ✅ Check network tab for 200 responses
6. ✅ Verify server is running
7. ✅ Check CORS headers if cross-origin
8. ✅ Ensure JSON is valid (use validator)

**Auto-refresh not working?**

1. ✅ Check console for JavaScript errors
2. ✅ Verify page has focus (browsers pause bg timers)
3. ✅ Check network tab shows requests every 10s
4. ✅ Ensure `loadShoutouts()` is defined
5. ✅ Check interval isn't cleared

**Styling issues?**

1. ✅ Verify CSS file is linked correctly
2. ✅ Check browser cache (Ctrl+Shift+R)
3. ✅ Inspect element to see applied styles
4. ✅ Check for CSS syntax errors
5. ✅ Verify color variables are defined

---

## 🌐 Browser Compatibility

| Browser | Version | Supported |
|---------|---------|-----------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |
| Chrome Mobile | 90+ | ✅ Full |

**Required features:**
- ES6 (async/await, arrow functions)
- Fetch API
- CSS Grid
- CSS Variables
- LocalStorage (optional)

---

## 📦 Dependencies

### Backend (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.6.1",
    "cors": "^2.8.5"
  }
}
```

**No additional dependencies needed for shout-outs!**

### Frontend
- Pure JavaScript (no libraries)
- Socket.IO client (for chat)
- No jQuery, React, or frameworks

---

## 🎓 Key Functions Reference

### JavaScript (app-kambuniyan.js)

```javascript
// Load shout-outs from server
loadShoutouts()

// Display shout-outs in UI
displayShoutouts(shouts)

// Submit new shout-out
submitShoutout(text)

// Get time ago string
getTimeAgo(date)

// Start auto-refresh
startShoutoutRefresh()

// Stop auto-refresh
stopShoutoutRefresh()

// Escape HTML
escapeHtml(text)
```

### PHP (add_shout.php)

```php
// Sanitize input
htmlspecialchars($text, ENT_QUOTES, 'UTF-8')
strip_tags($text)

// Read shouts
json_decode(file_get_contents($shoutsFile), true)

// Write shouts
file_put_contents($shoutsFile, $json, LOCK_EX)
```

---

## 🎨 CSS Classes Reference

```css
.kambuniyan-banner       /* Top event banner */
.shoutout-section        /* Shout-out wall container */
.shoutout-form           /* Shout-out input form */
.shoutout-item           /* Individual shout card */
.shoutout-text           /* Shout message text */
.shoutout-meta           /* Timestamp/metadata */
.btn-shout               /* Submit shout button */
.char-counter            /* Character count display */
.edition-badge           /* "Kambuniyan Edition" badge */
```

---

## 🚀 Quick Deploy to Render

```bash
# 1. Ensure shout-endpoints.js is in backend/
ls backend/shout-endpoints.js  # Should exist

# 2. Ensure server.js imports it
grep "shout-endpoints" backend/server.js  # Should show require

# 3. Create empty shouts.json
echo "[]" > frontend/shouts.json

# 4. Commit and push
git add .
git commit -m "Add Kambuniyan Edition with shout-outs"
git push

# 5. Render will auto-deploy
```

---

## 📞 Quick Support

**Common Issues:**

| Symptom | Solution |
|---------|----------|
| 404 on add_shout.php | Check endpoint path, ensure server running |
| Empty shout list | Verify shouts.json exists and is readable |
| Can't submit | Check character limit, network connection |
| Ugly styling | Clear cache, verify CSS file loaded |
| CORS error | Check server CORS settings |

---

**Mabuhay ang SKSU Kambuniyan Week 2025!** 🌿

---

*Last updated: December 2, 2025*
