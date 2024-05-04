<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Faculty.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$faculty = new Faculty($db);

$data = json_decode(file_get_contents("php://input"), true);

$facultyID = $data['facultyID'] ?? '';
$password = $data['password'] ?? '';


if (!$facultyID || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing credentials"]);
    exit;
}

$user = $faculty->getFacultyData($facultyID);

if (!$user) {
    http_response_code(404); // Not found status
    echo json_encode(["message" => "Faculty Professor not found"]);
    exit;
}

if ($user && password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "Login successful", "facultyID" => $user['facultyid']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Login failed"]);
}
exit;
?>
