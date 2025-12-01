/**
 * Shout-Out Endpoints for Node.js
 * SKSU Kambuniyan Week 2025 - Sulyap Kambuniyan Edition
 * 
 * This replaces PHP endpoints for Render deployment
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const shoutsFile = path.join(__dirname, '../frontend/shouts.json');

// Ensure shouts.json exists
if (!fs.existsSync(shoutsFile)) {
  fs.writeFileSync(shoutsFile, '[]', 'utf8');
  console.log('✅ Created shouts.json file');
}

/**
 * GET /get_shouts.php
 * Returns all shout-outs from shouts.json
 */
router.get('/get_shouts.php', (req, res) => {
  try {
    const data = fs.readFileSync(shoutsFile, 'utf8');
    const shouts = JSON.parse(data);
    
    res.json({
      success: true,
      shouts: Array.isArray(shouts) ? shouts : [],
      count: Array.isArray(shouts) ? shouts.length : 0
    });
  } catch (error) {
    console.error('Error reading shouts:', error);
    res.json({
      success: true,
      shouts: [],
      count: 0
    });
  }
});

/**
 * POST /add_shout.php
 * Adds a new shout-out to shouts.json
 */
router.post('/add_shout.php', (req, res) => {
  const { text } = req.body;
  
  // Validate input
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Text is required'
    });
  }
  
  // Check length
  if (text.length > 200) {
    return res.status(400).json({
      success: false,
      message: 'Text too long (max 200 characters)'
    });
  }
  
  try {
    // Read existing shouts
    let shouts = [];
    if (fs.existsSync(shoutsFile)) {
      const data = fs.readFileSync(shoutsFile, 'utf8');
      const parsed = JSON.parse(data);
      shouts = Array.isArray(parsed) ? parsed : [];
    }
    
    // Sanitize text - remove HTML tags and dangerous characters
    const sanitizedText = text
      .trim()
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    
    // Create new shout
    const newShout = {
      text: sanitizedText,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      id: `shout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Add to beginning (newest first)
    shouts.unshift(newShout);
    
    // Limit to 100 shout-outs
    if (shouts.length > 100) {
      shouts = shouts.slice(0, 100);
    }
    
    // Save to file
    fs.writeFileSync(shoutsFile, JSON.stringify(shouts, null, 2), 'utf8');
    
    console.log('📣 New shout-out posted:', sanitizedText.substring(0, 50));
    
    res.json({
      success: true,
      message: 'Shout-out posted successfully!',
      shout: newShout
    });
  } catch (error) {
    console.error('Error saving shout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save shout-out'
    });
  }
});

module.exports = router;
