<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Student.php';

header("Content-Type: application/json");

if (isset($_GET['studentId']) && !empty($_GET['studentId'])) {
    $studentId = $_GET['studentId'];
    $db = new Database();
    $dbConnection = $db->getConnection();
    $student = new Student($dbConnection);
    $studentDetails = $student->getStudentData($studentId);
    echo json_encode($studentDetails);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Student ID is required']);
}
?>
