<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Dean.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$dean = new Dean($db);

// Decode JSON POST input
$data = json_decode(file_get_contents("php://input"), true);

$deanID = $data['deanID'] ?? '';
$password = $data['password'] ?? '';


if (!$deanID || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing credentials"]);
    exit;
}

// Using the Dean model to get dean data
$user = $dean->getDeanData($deanID);

if (!$user) {
    http_response_code(404); // Not found status
    echo json_encode(["message" => "Dean not found"]);
    exit;
}

if ($user && password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "Login successful", "deanID" => $user['deanid']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Login failed"]);
}
exit;
?>
