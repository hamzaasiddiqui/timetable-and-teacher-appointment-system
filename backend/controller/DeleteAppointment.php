<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Appointment.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['appointmentId'])) {
    $appointmentId = $data['appointmentId'];

    $db = new Database();
    $appointment = new Appointment($db->getConnection());

    $result = $appointment->deleteAppointment($appointmentId);
    if ($result) {
        echo json_encode(['message' => 'Appointment deleted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete appointment']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Appointment ID is required']);
}
?>
