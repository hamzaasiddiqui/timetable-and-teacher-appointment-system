<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Student.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['studentId'], $data['currentPassword'], $data['newPassword']) && !empty($data['studentId'])) {
    $studentId = $data['studentId'];
    $currentPassword = $data['currentPassword'];
    $newPassword = $data['newPassword'];

    $db = new Database();
    $dbConnection = $db->getConnection();
    $student = new Student($dbConnection);

    if ($student->verifyPassword($studentId, $currentPassword)) {
        if ($student->changePassword($studentId, $newPassword)) {
            echo json_encode(['message' => 'Password changed successfully', 'success' => true]);
        } else {
            echo json_encode(['message' => 'Failed to change password', 'success' => false]);
        }
    } else {
        echo json_encode(['message' => 'Current password is incorrect', 'success' => false]);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required data']);
}
?>
