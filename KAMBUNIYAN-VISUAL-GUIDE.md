# 🌿 Kambuniyan Edition - Visual File Structure

## 📁 Complete Project Layout

```
sulyap-main/
│
├── 📄 KAMBUNIYAN-README.md                    ✨ START HERE - Main docs
├── 📄 KAMBUNIYAN-DEPLOYMENT-GUIDE.md          📚 Full deployment guide
├── 📄 KAMBUNIYAN-QUICK-REFERENCE.md           ⚡ Quick commands & tips
├── 📄 IMPLEMENTATION-COMPLETE-KAMBUNIYAN.md   ✅ What's been delivered
│
├── 📂 frontend/
│   ├── 🌟 index-kambuniyan.html               🎨 Main HTML (Kambuniyan theme)
│   ├── 🎨 styles-kambuniyan.css               💚 Green/Gold CSS theme
│   ├── ⚡ app-kambuniyan.js                   📣 JS with shout-out logic
│   ├── 🔧 add_shout.php                       ➕ Add shout endpoint (PHP)
│   ├── 🔧 get_shouts.php                      📥 Get shouts endpoint (PHP)
│   ├── 📋 shouts.json                         💾 Shout-out storage
│   │
│   ├── 📂 assets/
│   │   └── 📂 sounds/
│   │       └── Matched-Notify.wav
│   │
│   ├── index.html                             (Original Sulyap)
│   ├── styles.css                             (Original CSS)
│   └── app.js                                 (Original JS)
│
└── 📂 backend/
    ├── server.js                              ✅ Updated with shout routes
    ├── 🔧 shout-endpoints.js                  🚀 Node.js shout endpoints
    └── package.json
```

---

## 🎯 File Purposes

### 📚 Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `KAMBUNIYAN-README.md` | Overview, features, examples | First time setup |
| `KAMBUNIYAN-DEPLOYMENT-GUIDE.md` | Step-by-step deployment | Before deploying |
| `KAMBUNIYAN-QUICK-REFERENCE.md` | Quick commands, API ref | During development |
| `IMPLEMENTATION-COMPLETE-KAMBUNIYAN.md` | Deliverables checklist | Review what's done |

### 🌟 Core Kambuniyan Files

| File | Lines | Purpose |
|------|-------|---------|
| `index-kambuniyan.html` | ~450 | Main page with theme |
| `styles-kambuniyan.css` | ~1200 | Green/Gold styling |
| `app-kambuniyan.js` | ~500 | Chat + Shout-outs |

### 🔧 Shout-Out Backend

| File | Technology | Purpose |
|------|-----------|---------|
| `add_shout.php` | PHP | Add new shout-outs |
| `get_shouts.php` | PHP | Retrieve all shouts |
| `shout-endpoints.js` | Node.js | Alternative for Render |
| `shouts.json` | JSON | Data storage |

---

## 🎨 Visual Page Structure

```
┌─────────────────────────────────────────────────────┐
│  🎉 SKSU Kambuniyan Week 2025                       │ ← Banner
│  Isang sulyap sa pagkakaisa ng pitong campus        │
├─────────────────────────────────────────────────────┤
│                                                     │
│              ⭐ KAMBUNIYAN LOGO ⭐                   │ ← Logo
│                                                     │
│                  🌿 Sulyap 🌿                        │ ← Title
│                                                     │
│          🏅 Kambuniyan Edition 2025 🏅              │ ← Badge
│                                                     │
│      Makipag-usap nang anonymous sa mga...          │ ← Subtitle
│                                                     │
│         ● 12 online ngayon                          │ ← Online counter
│                                                     │
│  ┌─────────────────────────────────────────┐       │
│  │ Say hi to someone from another campus... │       │ ← Username input
│  └─────────────────────────────────────────┘       │
│                                                     │
│  ┌──────────────────────────────────────┐          │
│  │  Magsimula ng Pag-uusap →            │          │ ← Start button
│  └──────────────────────────────────────┘          │
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌─────────┐           │
│  │ 🔒      │  │ ⚡        │  │ 🌿      │           │ ← Features
│  │Anonymous│  │ Instant   │  │ Fleeting│           │
│  └─────────┘  └──────────┘  └─────────┘           │
│                                                     │
│  ═══════════════════════════════════════           │
│                                                     │
│  📣 Kambuniyan Shout-Out Wall                       │ ← Shout section
│  Mag-iwan ng mensahe para sa lahat!                │
│                                                     │
│  ┌────────────────────────────────────────┐        │
│  │ Ano ang nais mong ibahagi...           │        │ ← Shout input
│  │                                        │        │
│  │                              0/200 ─┐  │        │
│  │                 [Mag-Shout Out! ↑] │  │        │ ← Submit button
│  └────────────────────────────────────────┘        │
│                                                     │
│  ┌────────────────────────────────────────┐        │
│  │ 🌿 "Excited for Kambuniyan Week!"      │        │
│  │    5 minutes ago                       │        │ ← Shout items
│  ├────────────────────────────────────────┤        │
│  │ 🌿 "Mabuhay SKSU! 🎉"                  │        │
│  │    10 minutes ago                      │        │
│  ├────────────────────────────────────────┤        │
│  │ 🌿 "See you all at the event!"         │        │
│  │    15 minutes ago                      │        │
│  └────────────────────────────────────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme Visual

```
┌─────────────────────────────────────────┐
│ PRIMARY GREEN (#0B6E4F)                 │ ← Headers, Buttons
├─────────────────────────────────────────┤
│                                         │
│ GOLD ACCENT (#F2C94C)                   │ ← Badges, Icons
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ WARM EARTH (#DDB892)                    │ ← Borders, Lines
│                                         │
├─────────────────────────────────────────┤
│                                         │
│ RICE PAPER (#FFF9ED)                    │ ← Background
│                                         │
├─────────────────────────────────────────┤
│ DEEP FOREST (#1A1A1A)                   │ ← Text
└─────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Shout-Out Submission Flow

```
┌──────────┐
│  User    │
│  Types   │
│ Message  │
└────┬─────┘
     │
     ▼
┌─────────────────────┐
│ Character Counter   │ (0-200)
│ Live Validation     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Click Submit        │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ JavaScript          │
│ - Validate empty    │
│ - Check length      │
│ - Sanitize input    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ POST /add_shout.php │
│ { text: "..." }     │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Backend (PHP/Node)  │
│ - Validate          │
│ - Sanitize HTML     │
│ - Add timestamp     │
│ - Generate ID       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Read shouts.json    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Add to array        │
│ (newest first)      │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Limit to 100        │
│ (trim old)          │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Write shouts.json   │
│ (with file lock)    │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Return success      │
│ { success: true }   │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Update UI           │
│ - Clear input       │
│ - Show success      │
│ - Reload shouts     │
└─────────────────────┘
```

### Auto-Refresh Flow

```
┌─────────────────┐
│  Page Loads     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ loadShoutouts() │ ← Initial load
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Start Timer     │
│ (10 seconds)    │
└────────┬────────┘
         │
         ▼
    ┌────────────┐
    │ Wait 10s   │
    └──────┬─────┘
           │
           ▼
    ┌──────────────────┐
    │ GET /get_shouts  │
    └──────┬───────────┘
           │
           ▼
    ┌──────────────────┐
    │ Update Display   │
    └──────┬───────────┘
           │
           └──────┐
                  │
                  ▼
           ┌────────────┐
           │ Wait 10s   │ ← Loop
           └────────────┘
```

---

## 🗂️ File Dependencies

```
index-kambuniyan.html
    │
    ├─→ styles-kambuniyan.css
    │       └─→ CSS Variables (colors)
    │
    ├─→ app-kambuniyan.js
    │       ├─→ socket.io (for chat)
    │       ├─→ fetch API (for shouts)
    │       └─→ DOM manipulation
    │
    └─→ Shout-out endpoints
            │
            ├─→ Option A: PHP
            │       ├─→ add_shout.php
            │       ├─→ get_shouts.php
            │       └─→ shouts.json
            │
            └─→ Option B: Node.js
                    ├─→ shout-endpoints.js
                    ├─→ server.js
                    └─→ shouts.json
```

---

## 📊 File Sizes

```
┌─────────────────────────────┬──────────┐
│ File                        │ Size     │
├─────────────────────────────┼──────────┤
│ index-kambuniyan.html       │ ~25 KB   │
│ styles-kambuniyan.css       │ ~40 KB   │
│ app-kambuniyan.js           │ ~20 KB   │
│ add_shout.php               │ ~3 KB    │
│ get_shouts.php              │ ~2 KB    │
│ shout-endpoints.js          │ ~4 KB    │
│ shouts.json (empty)         │ 2 bytes  │
│ shouts.json (100 shouts)    │ ~10 KB   │
├─────────────────────────────┼──────────┤
│ TOTAL (without shouts)      │ ~94 KB   │
│ TOTAL (with 100 shouts)     │ ~104 KB  │
└─────────────────────────────┴──────────┘
```

---

## 🎯 Deployment Paths

### Path 1: XAMPP (Local)
```
C:\xampp\htdocs\sulyap-main\
    └── frontend\
        ├── index-kambuniyan.html
        ├── styles-kambuniyan.css
        ├── app-kambuniyan.js
        ├── add_shout.php          ✅ Use PHP
        ├── get_shouts.php         ✅ Use PHP
        └── shouts.json
```

### Path 2: Render (Production)
```
/app/
    ├── backend/
    │   ├── server.js              ✅ Includes shout routes
    │   └── shout-endpoints.js     ✅ Use Node.js
    │
    └── frontend/
        ├── index.html → index-kambuniyan.html
        ├── styles.css → styles-kambuniyan.css
        ├── app.js → app-kambuniyan.js
        └── shouts.json
```

### Path 3: Hybrid
```
Render (Chat):
    /app/backend/ → Chat server

InfinityFree (Shouts):
    /public_html/
        ├── add_shout.php
        ├── get_shouts.php
        └── shouts.json

Frontend:
    fetch('https://your-php-host.com/add_shout.php')
```

---

## 🚀 Quick Start Visual Guide

### Step 1: Copy Files
```
📁 Your Project
    ├── 📂 frontend/
    │   ├── 📄 index-kambuniyan.html       ← Copy here
    │   ├── 📄 styles-kambuniyan.css       ← Copy here
    │   ├── 📄 app-kambuniyan.js           ← Copy here
    │   ├── 📄 add_shout.php               ← Copy here
    │   ├── 📄 get_shouts.php              ← Copy here
    │   └── 📄 shouts.json                 ← Create: []
    │
    └── 📂 backend/
        ├── 📄 server.js                   ← Updated
        └── 📄 shout-endpoints.js          ← Copy here
```

### Step 2: Set Permissions
```
Windows:
    shouts.json → Properties → Security → Everyone → Full Control

Linux/Mac:
    chmod 666 shouts.json
```

### Step 3: Start Server
```
Terminal 1:               Terminal 2 (optional):
cd backend/               cd C:\xampp\
npm start                 apache_start.bat
                         (if using PHP)
```

### Step 4: Test
```
Browser:
    http://localhost:3000

Expected:
    ✅ Green/Gold theme visible
    ✅ Banner at top
    ✅ Shout-out wall at bottom
    ✅ Can submit shout-out
    ✅ Auto-refreshes every 10s
```

---

## ✨ Visual Success Indicators

When everything works, you should see:

```
✅ Banner: "SKSU Kambuniyan Week 2025"
✅ Logo: Star pattern (green/gold)
✅ Badge: "Kambuniyan Edition 2025"
✅ Colors: Green buttons, gold accents
✅ Shout form: 200 char counter
✅ Shout list: Auto-updating
✅ Time stamps: "5m ago" format
✅ Mobile: Responsive layout
```

---

## 🎨 Theme Comparison

### Before (Original Sulyap)
```
Colors: Purple/Blue (#6366F1, #8B5CF6)
Logo: Chat bubble icons
Badge: None
Banner: None
Language: English
Pattern: None
```

### After (Kambuniyan Edition)
```
Colors: Green/Gold (#0B6E4F, #F2C94C)
Logo: Star pattern (cultural)
Badge: "Kambuniyan Edition 2025"
Banner: Event banner with subtitle
Language: Filipino/Tagalog
Pattern: Tribal (subtle)
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 768px):
├── Compact banner
├── Smaller fonts
├── Touch-friendly buttons (44px+)
└── Scrollable shout list

Desktop (≥ 769px):
├── Full banner
├── Larger fonts
├── Hover effects
├── Max width: 900px
└── Side borders
```

---

**Mabuhay ang SKSU Kambuniyan Week 2025!** 🌿🎉

All files ready to use. Start with `KAMBUNIYAN-README.md` for setup!
