<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Faculty.php';
require_once '../model/Course.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$faculty = new Faculty($db);
$course = new Course($db);

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['facultyId'])) {
    if ($faculty->isProfessorAssigned($data['facultyId'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Professor is assigned to a course. Unallocate professor first.', 'success' => false]);
    } else {
        $result = $faculty->removeFaculty($data['facultyId']);

        if ($result) {
            echo json_encode(['message' => 'Professor removed successfully', 'success' => true]);
        } else {
            echo json_encode(['message' => 'Failed to remove professor', 'success' => false]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing professor ID', 'success' => false]);
}
?>
