# 🌿 Sulyap: Kambuniyan Edition

**SKSU Kambuniyan Week 2025 — Sulyap Festival Edition**

*"Isang sulyap sa pagkakaisa ng pitong campus."*

---

## 🎨 What's New in Kambuniyan Edition

This is a special rebranded version of Sulyap created for **SKSU Kambuniyan Week 2025**, featuring:

### Visual Rebrand
- ✅ **Green & Gold Theme** - SKSU Kambuniyan colors (#0B6E4F, #F2C94C)
- ✅ **Event Banner** - "SKSU Kambuniyan Week 2025" at top
- ✅ **Tribal Patterns** - Subtle cultural accents in background
- ✅ **Filipino Text** - Tagalog placeholders and UI elements
- ✅ **Kambuniyan Badge** - "Kambuniyan Edition 2025" branding
- ✅ **Rice Paper Background** - Warm, inviting color scheme (#FFF9ED)

### New Feature: Shout-Out Wall 📣
- ✅ **Public Message Board** - Share messages with everyone
- ✅ **JSON Storage** - No database needed, uses `shouts.json`
- ✅ **Auto-Refresh** - Updates every 10 seconds
- ✅ **Character Limit** - Max 200 characters per shout
- ✅ **Security** - HTML sanitization & XSS protection
- ✅ **Mobile Responsive** - Works perfectly on all devices

### Preserved Features
- ✅ Anonymous 1-on-1 chat
- ✅ Reply to messages
- ✅ Typing indicators
- ✅ Feedback system
- ✅ Online user counter
- ✅ Sound notifications

---

## 📦 Files Included

```
frontend/
├── index-kambuniyan.html       # Main HTML (Kambuniyan theme)
├── styles-kambuniyan.css       # Themed stylesheet
├── app-kambuniyan.js           # JavaScript with shout-outs
├── add_shout.php               # PHP: Add shout-out
├── get_shouts.php              # PHP: Get all shout-outs
└── shouts.json                 # Shout-out storage

backend/
├── server.js                   # Updated server (includes shout routes)
└── shout-endpoints.js          # Node.js shout-out endpoints
```

---

## 🚀 Quick Start

### For Local Development (XAMPP)

1. **Copy files to htdocs**:
   ```bash
   C:\xampp\htdocs\sulyap-main\frontend\
   ```

2. **Set permissions** (Windows):
   - Right-click `shouts.json` → Properties → Security
   - Add "Everyone" with Full Control

3. **Start XAMPP**:
   - Start Apache (for PHP)
   - Start Node.js server: `npm start`

4. **Open browser**:
   ```
   http://localhost:3000
   ```

### For Render Deployment

The Kambuniyan Edition works on Render using **Node.js endpoints** (no PHP needed):

1. **Backend already configured** with `shout-endpoints.js`
2. **Deploy normally** - Push to GitHub/Render
3. **Shout-outs will work** automatically via Node.js

---

## 📣 How Shout-Out Wall Works

### User Flow:
1. User opens Sulyap homepage
2. Sees shout-out wall at bottom
3. Types message (max 200 chars)
4. Clicks "Mag-Shout Out!"
5. Message appears instantly
6. Auto-refreshes every 10 seconds

### Technical Flow:
```
User Input → JavaScript Validation → POST /add_shout.php
                                    ↓
                                 Sanitize
                                    ↓
                            Save to shouts.json
                                    ↓
                            Return success
                                    ↓
                            Reload shout-outs
```

### Storage Format (`shouts.json`):
```json
[
  {
    "text": "Mabuhay SKSU Kambuniyan 2025!",
    "timestamp": "2025-12-02 10:30:45",
    "id": "shout_1733134245_abc123"
  }
]
```

---

## 🎨 Color Palette

```css
:root {
  --green: #0B6E4F;          /* Primary - SKSU Green */
  --gold: #F2C94C;           /* Accent - Kambuniyan Gold */
  --warm-earth: #DDB892;     /* Borders & accents */
  --rice-paper: #FFF9ED;     /* Background */
  --deep-forest: #1A1A1A;    /* Text */
}
```

**Usage:**
- **Primary buttons**: Green gradient
- **Accent elements**: Gold badges, icons
- **Background**: Warm rice paper tone
- **Text**: Deep forest (high contrast)
- **Borders**: Warm earth (subtle)

---

## 📱 Screenshots

### Homepage with Kambuniyan Banner
```
┌─────────────────────────────────────────┐
│  🎉 SKSU Kambuniyan Week 2025           │
│  Isang sulyap sa pagkakaisa...          │
├─────────────────────────────────────────┤
│                                         │
│          ⭐ Sulyap Logo ⭐              │
│                                         │
│         🏅 Kambuniyan Edition 2025      │
│                                         │
│   [Say hi to another campus...]         │
│                                         │
│      [Magsimula ng Pag-uusap →]        │
│                                         │
│  ─────────────────────────────────      │
│                                         │
│   📣 Kambuniyan Shout-Out Wall          │
│                                         │
│   [Type your message here...]           │
│                                         │
│   🌿 "Excited for Kambuniyan!" 5m ago   │
│   🌿 "See you at the event!" 10m ago    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Configuration

### Change Event Details
In `index-kambuniyan.html`:
```html
<h2 class="banner-title">YOUR EVENT NAME</h2>
<p class="banner-subtitle">Your event tagline</p>
```

### Adjust Auto-Refresh Interval
In `app-kambuniyan.js`:
```javascript
// Change from 10 seconds to your preference
setInterval(() => {
  loadShoutouts();
}, 10000); // milliseconds
```

### Modify Shout Character Limit
In `add_shout.php` or `shout-endpoints.js`:
```php
// Change 200 to your limit
if (strlen($text) > 200) {
  // Error
}
```

### Update Colors
In `styles-kambuniyan.css`:
```css
:root {
  --green: #YourColor;
  --gold: #YourColor;
}
```

---

## 🔐 Security Features

✅ **HTML Sanitization**: All user input cleaned  
✅ **XSS Prevention**: Special characters escaped  
✅ **Character Limits**: Max 200 enforced  
✅ **Input Validation**: Empty messages rejected  
✅ **File Locking**: Prevents race conditions  
✅ **Method Restrictions**: Only POST/GET allowed  

---

## 📊 Performance

- **File size**: ~10KB for 100 shout-outs
- **Load time**: < 1 second
- **Auto-refresh**: Every 10 seconds (configurable)
- **Mobile data usage**: ~2KB per refresh
- **Storage limit**: 100 shout-outs (auto-trimmed)

---

## 🐛 Troubleshooting

### Shout-outs not loading?
**Check:**
1. `shouts.json` exists in frontend folder
2. File has write permissions
3. Browser console for errors
4. Network tab shows successful requests

**Fix:**
```bash
# Ensure file exists
touch frontend/shouts.json
echo "[]" > frontend/shouts.json

# Set permissions (Linux/Mac)
chmod 666 frontend/shouts.json
```

### "Permission denied" error?
**Windows:**
- Right-click `shouts.json` → Properties
- Security → Edit → Add "Everyone" → Full Control

**Linux/Mac:**
```bash
chmod 666 frontend/shouts.json
```

### CORS errors in browser?
**Node.js** - Already configured in `shout-endpoints.js`

**PHP** - Headers already set in PHP files

**If still issues:**
```javascript
// In server.js
app.use(cors({
  origin: '*' // Allow all origins
}));
```

### Auto-refresh stopped working?
**Causes:**
- Page lost focus (browser paused timer)
- JavaScript error (check console)
- Network issue

**Fix:**
- Refresh page
- Check console for errors
- Verify network connectivity

---

## 📱 Mobile Responsiveness

Optimized for all devices:

**Breakpoints:**
- Mobile: < 768px
- Desktop: ≥ 769px

**Mobile Features:**
- Touch-friendly buttons (44px+)
- Scrollable shout-out list
- Responsive text sizes
- Compact banner
- Optimized spacing

---

## 🎓 Usage Examples

### Adding a Shout-Out (JavaScript)
```javascript
const response = await fetch('add_shout.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'Hello Kambuniyan!' })
});

const data = await response.json();
console.log(data.success); // true
```

### Getting All Shout-Outs (JavaScript)
```javascript
const response = await fetch('get_shouts.php');
const data = await response.json();
console.log(data.shouts); // Array of shout-outs
```

### Testing with cURL
```bash
# Add shout-out
curl -X POST http://localhost:3000/add_shout.php \
  -H "Content-Type: application/json" \
  -d '{"text":"Test message"}'

# Get shout-outs
curl http://localhost:3000/get_shouts.php
```

---

## 🌟 Design Philosophy

The Kambuniyan Edition embodies:

1. **Minimalism** - Clean, focused interface
2. **Filipino Culture** - Colors, patterns, language
3. **Accessibility** - High contrast, readable fonts
4. **Performance** - Lightweight, fast loading
5. **Simplicity** - Easy to use, no complexity

**Color Symbolism:**
- **Green** - Growth, unity, SKSU pride
- **Gold** - Excellence, celebration, festivity
- **Earth Tones** - Warmth, community, connection

---

## 📞 Support

For issues or questions:
1. Check the [Deployment Guide](KAMBUNIYAN-DEPLOYMENT-GUIDE.md)
2. Review troubleshooting section above
3. Inspect browser console for errors
4. Verify file permissions

---

## 🎉 Event Information

**Event**: SKSU Kambuniyan Week 2025  
**Theme**: Isang sulyap sa pagkakaisa ng pitong campus  
**Platform**: Sulyap - Anonymous Chat  
**Special Feature**: Public Shout-Out Wall  

---

## 📄 License

This is a customized version of Sulyap for SKSU Kambuniyan Week 2025.

Original Sulyap created with ❤️ for fleeting, anonymous connections.

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Test shout-out submission
- [ ] Verify auto-refresh works
- [ ] Check mobile responsiveness
- [ ] Confirm file permissions
- [ ] Test HTML sanitization
- [ ] Verify banner displays correctly
- [ ] Test on different browsers
- [ ] Check CORS settings
- [ ] Backup `shouts.json`
- [ ] Monitor server logs

---

## ✨ Quick Links

- [Deployment Guide](KAMBUNIYAN-DEPLOYMENT-GUIDE.md) - Full setup instructions
- [Backend Server](backend/server.js) - Main server code
- [Shout Endpoints](backend/shout-endpoints.js) - Shout-out API
- [Frontend HTML](frontend/index-kambuniyan.html) - Main page
- [CSS Styles](frontend/styles-kambuniyan.css) - Kambuniyan theme

---

**Mabuhay ang SKSU Kambuniyan Week 2025!** 🌿🎉

*Isang sulyap, isang koneksyon.*
