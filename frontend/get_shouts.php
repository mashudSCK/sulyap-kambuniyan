<?php
/**
 * Get Shout-Outs Endpoint
 * SKSU Kambuniyan Week 2025 - Sulyap Kambuniyan Edition
 * 
 * Returns all shout-outs from shouts.json
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Path to shouts.json
$shoutsFile = __DIR__ . '/shouts.json';

// Check if file exists
if (!file_exists($shoutsFile)) {
    // Return empty array if file doesn't exist yet
    echo json_encode([
        'success' => true,
        'shouts' => [],
        'count' => 0
    ]);
    exit();
}

// Read shouts from file
$content = file_get_contents($shoutsFile);
$shouts = json_decode($content, true);

// Ensure it's an array
if (!is_array($shouts)) {
    $shouts = [];
}

// Return shouts
echo json_encode([
    'success' => true,
    'shouts' => $shouts,
    'count' => count($shouts)
]);
?>
