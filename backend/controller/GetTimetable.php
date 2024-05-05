<?php
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Timeslot.php';

$departmentID = isset($_GET['departmentID']) ? $_GET['departmentID'] : null;

if (!$departmentID) {
    http_response_code(400);
    echo json_encode(['error' => 'Department ID is required']);
    exit;
}

try {
    $db = new Database();
    $timeslot = new Timeslot($db->getConnection());

    $timetable = $timeslot->fetchTimetableByDepartment($departmentID);
    echo json_encode(['data' => $timetable]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
?>
