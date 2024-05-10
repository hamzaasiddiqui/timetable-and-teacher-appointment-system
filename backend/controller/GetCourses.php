<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Course.php';

header("Content-Type: application/json");

$database = new Database();
$db = $database->getConnection();
$course = new Course($db);

$result = $course->getAllCourses();

$courses = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($courses, $row);
}

if (empty($courses)) {
    echo json_encode(["message" => "No courses found."]);
} else {
    echo json_encode($courses);
}
?>
