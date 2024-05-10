<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Faculty.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$faculty = new Faculty($db);

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['facultyId']) && !empty($data['facultyName']) && isset($data['departmentId'])) {
    $facultyId = $data['facultyId'];
    $facultyName = $data['facultyName'];
    $departmentId = $data['departmentId'];
    $defaultPassword = "faculty_professor";

    $hashedPassword = password_hash($defaultPassword, PASSWORD_DEFAULT);

    $result = $faculty->addFaculty($facultyId, $facultyName, $departmentId, $hashedPassword);

    if ($result) {
        echo json_encode(['message' => 'Professor added successfully']);
    } else {
        echo json_encode(['message' => 'Failed to add professor']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required data']);
}
?>
