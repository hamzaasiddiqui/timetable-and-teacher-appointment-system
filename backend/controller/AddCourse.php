<?php
require_once '../cors.php';
require_once '../model/Database.php';

header("Content-Type: application/json");

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['courseId'], $data['title'], $data['departmentId']) || empty($data['title'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Unable to Add Course: Missing required fields', 'success' => false]);
    exit;
}

$courseId = $data['courseId'];
$title = $data['title'];
$departmentId = $data['departmentId'];

try {
    $stmt = $conn->prepare("INSERT INTO COURSE (CourseID, Title, DepartmentID) VALUES (:courseId, :title, :departmentId)");

    $stmt->bindParam(':courseId', $courseId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':departmentId', $departmentId);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['message' => 'Course added successfully', 'success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to add course', 'success' => false]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Database error: ' . $e->getMessage(), 'success' => false]);
}
