<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Student.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!empty($data['studentId']) && !empty($data['name']) && !empty($data['major']) && !empty($data['departmentId'])) {
    $db = new Database();
    $dbConnection = $db->getConnection();
    $student = new Student($dbConnection);
    $result = $student->addStudent($data['studentId'], $data['name'], $data['major'], $data['departmentId']);
    if ($result) {
        echo json_encode(['message' => 'Student added successfully']);
    } else {
        echo json_encode(['message' => 'Failed to add student']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required data']);
}
