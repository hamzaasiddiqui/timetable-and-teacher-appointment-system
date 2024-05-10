<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Appointment.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['studentId']) && !empty($data['facultyId']) && !empty($data['datetime']) && !empty($data['purpose'])) {
    $db = new Database();
    $dbConnection = $db->getConnection();
    $appointment = new Appointment($dbConnection);

    $result = $appointment->addAppointment($data['studentId'], $data['facultyId'], $data['datetime'], $data['purpose']);
    if ($result) {
        echo json_encode(['message' => 'Appointment added successfully', 'success' => true]);
    } else {
        echo json_encode(['message' => 'Failed to add appointment', 'success' => false]);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required data', 'success' => false]);
}
?>
