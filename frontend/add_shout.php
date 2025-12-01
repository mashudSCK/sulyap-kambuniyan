<?php
/**
 * Add Shout-Out Endpoint
 * SKSU Kambuniyan Week 2025 - Sulyap Kambuniyan Edition
 * 
 * Saves new shout-outs to shouts.json
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!isset($data['text']) || empty(trim($data['text']))) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Text is required']);
    exit();
}

$text = trim($data['text']);

// Validate text length
if (strlen($text) > 200) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Text too long (max 200 characters)']);
    exit();
}

// Sanitize text - remove HTML tags and special characters
$text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
$text = strip_tags($text);

// Path to shouts.json
$shoutsFile = __DIR__ . '/shouts.json';

// Read existing shouts
$shouts = [];
if (file_exists($shoutsFile)) {
    $content = file_get_contents($shoutsFile);
    $shouts = json_decode($content, true);
    
    // Ensure it's an array
    if (!is_array($shouts)) {
        $shouts = [];
    }
}

// Create new shout-out
$newShout = [
    'text' => $text,
    'timestamp' => date('Y-m-d H:i:s'),
    'id' => uniqid('shout_', true)
];

// Add to beginning of array (newest first)
array_unshift($shouts, $newShout);

// Limit to 100 most recent shout-outs to prevent file from growing too large
if (count($shouts) > 100) {
    $shouts = array_slice($shouts, 0, 100);
}

// Save to file
$jsonData = json_encode($shouts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
$result = file_put_contents($shoutsFile, $jsonData, LOCK_EX);

if ($result === false) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save shout-out']);
    exit();
}

// Return success response
echo json_encode([
    'success' => true,
    'message' => 'Shout-out posted successfully!',
    'shout' => $newShout
]);
?>
