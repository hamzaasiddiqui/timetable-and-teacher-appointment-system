<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Appointment.php';

header("Content-Type: application/json");

if (isset($_GET['studentId']) && !empty($_GET['studentId'])) {
    $studentId = $_GET['studentId'];
    $db = new Database();
    $dbConnection = $db->getConnection();
    $appointment = new Appointment($dbConnection);

    $appointments = $appointment->getAppointmentsByStudentId($studentId);
    echo json_encode(['data' => $appointments]);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Student ID is required']);
}
?>
