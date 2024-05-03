<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Respond and stop script processing if it's a preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Could set specific status code if needed, otherwise just stop processing
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Explicitly set HTTP response code
    exit(0);
}

?>