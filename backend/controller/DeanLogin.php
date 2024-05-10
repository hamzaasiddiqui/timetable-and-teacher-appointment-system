<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Dean.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$dean = new Dean($db);

$data = json_decode(file_get_contents("php://input"), true);

$deanID = $data['deanID'] ?? '';
$password = $data['password'] ?? '';


if (!$deanID || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing credentials"]);
    exit;
}

$user = $dean->getDeanData($deanID);

if (!$user) {
    http_response_code(404);
    echo json_encode(["message" => "Dean not found"]);
    exit;
}

if ($user && password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "Login successful", "deanID" => $user['deanid'], "departmentID" => $user['departmentid']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Login failed"]);
}
exit;
?>
