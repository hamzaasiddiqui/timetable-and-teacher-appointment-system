<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Appointment.php';

header("Content-Type: application/json");

if (isset($_GET['facultyId']) && !empty($_GET['facultyId'])) {
    $facultyId = $_GET['facultyId'];
    $db = new Database();
    $dbConnection = $db->getConnection();
    $appointment = new Appointment($dbConnection);

    $appointments = $appointment->getAppointmentsByFacultyId($facultyId);
    echo json_encode(['data' => $appointments]);
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Faculty ID is required']);
}
?>
