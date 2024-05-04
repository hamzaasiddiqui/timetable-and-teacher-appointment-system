<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Course.php';

header("Content-Type: application/json");

// Establish database connection
$database = new Database();
$db = $database->getConnection();

// Create Course instance
$course = new Course($db);

// Get JSON POST body
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['courseid']) && !empty($data['facultyid'])) {
    $result = $course->allocateProfessorToCourse($data['courseid'], $data['facultyid']);

    if ($result) {
        echo json_encode(['message' => 'Professor allocated successfully']);
    } else {
        echo json_encode(['message' => 'Failed to allocate professor']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required data']);
}
?>
