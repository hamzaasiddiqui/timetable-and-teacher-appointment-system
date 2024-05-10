<?php
header("Content-Type: application/json");
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Timetable.php';
require_once '../model/Timeslot.php';

$data = json_decode(file_get_contents("php://input"), true);
error_log("Received data: " . print_r($data, true));

try {
    $db = new Database();
    $timetable = new Timetable($db->getConnection());
    $timeslot = new Timeslot($db->getConnection());

    $departmentID = $data['departmentID'];
    $timetableData = $data['timetable'];

    if (!isset($departmentID, $timetableData) || !is_array($timetableData)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or incomplete data provided']);
        exit;
    }

    $timetableId = $timetable->getOrCreateTimetableId($departmentID);

    $timeslot->deleteTimeslotsByTimetableId($timetableId);

    foreach ($timetableData as $slot) {
        foreach (['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as $day) {
            if (isset($slot[$day]['course'], $slot[$day]['venue']) && !empty($slot[$day]['course'])) {
                $courseId = $slot[$day]['course'];
                $location = $slot[$day]['venue'];
                $startTime = $slot['startTime'];
                $endTime = $slot['endTime'];
                $processedDay = ucfirst($day);
                $timeslot->saveTimeslot($timetableId, $courseId, $startTime, $endTime, $processedDay, $location);
            }
        }
    }    

    echo json_encode(['message' => 'Timetable saved successfully!']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    exit;
}
?>
