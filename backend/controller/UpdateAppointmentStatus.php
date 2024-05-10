<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Appointment.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['appointmentId'], $data['status']) && in_array($data['status'], ['pending', 'cancelled', 'confirm'])) {
    $appointmentId = $data['appointmentId'];
    $status = $data['status'];

    $db = new Database();
    $appointment = new Appointment($db->getConnection());

    $result = $appointment->updateAppointmentStatus($appointmentId, $status);
    if ($result) {
        echo json_encode(['message' => 'Appointment status updated successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update appointment status']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid or missing data']);
}
?>
