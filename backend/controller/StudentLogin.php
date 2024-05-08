<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Student.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$student = new Student($db);

$data = json_decode(file_get_contents("php://input"), true);

$studentID = $data['studentID'] ?? '';
$password = $data['password'] ?? '';


if (!$studentID || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Missing credentials"]);
    exit;
}

$user = $student->getStudentData($studentID);

if (!$user) {
    http_response_code(404); // Not found status
    echo json_encode(["message" => "Student not found"]);
    exit;
}

if ($user && password_verify($password, $user['password'])) {
    http_response_code(200);
    echo json_encode(["message" => "Login successful", "studentID" => $user['studentid'], "departmentID" => $user['facultyid']]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Login failed"]);
}
exit;
?>
