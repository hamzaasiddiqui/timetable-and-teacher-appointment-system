<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Course.php';

header("Content-Type: application/json");

// Establish database connection
$database = new Database();
$db = $database->getConnection();
$course = new Course($db);

// Get JSON POST body
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['courseId'])) {
    $result = $course->unallocateProfessorFromCourse($data['courseId']);

    if ($result) {
        echo json_encode(['message' => 'Professor unallocated successfully', 'success' => true]);
    } else {
        echo json_encode(['message' => 'Failed to unallocate professor', 'success' => false]);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing course ID', 'success' => false]);
}
?>
