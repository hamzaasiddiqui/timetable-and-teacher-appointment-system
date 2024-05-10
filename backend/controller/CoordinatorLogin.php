<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Coordinator.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$coordinator = new Coordinator($db);

$data = json_decode(file_get_contents("php://input"), true);

$coordinatorID = $data['coordinatorID'] ?? '';
$password = $data['password'] ?? '';


if (!$coordinatorID || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing credentials"]);
    exit;
}

$user = $coordinator->getCoordinatorData($coordinatorID);

if (!$user) {
    http_response_code(404);
    echo json_encode(["message" => "Coordinator not found"]);
    exit;
}

if ($user && password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "Login successful", "coordinatorID" => $user['coordinatorid'], "departmentID" => $user['departmentid']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Login failed"]);
}
exit;
?>
