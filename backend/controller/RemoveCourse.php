<?php
header("Content-Type: application/json");
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Course.php';

$data = json_decode(file_get_contents("php://input"), true);
$courseId = $data['courseId'] ?? '';

if (!$courseId) {
    http_response_code(400);
    echo json_encode(['error' => 'Course ID is required']);
    exit;
}

$db = new Database();
$course = new Course($db->getConnection());

try {
    $result = $course->deleteCourse($courseId);
    echo json_encode(['message' => 'Course removed successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to remove course: ' . $e->getMessage()]);
}
?>
