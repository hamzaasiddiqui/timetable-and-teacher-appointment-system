<?php
require_once '../cors.php';

class Appointment {
    private $conn;
    private $table_name = "appointment";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function addAppointment($studentId, $facultyId, $datetime, $purpose) {
        $query = "INSERT INTO " . $this->table_name . " (studentid, facultyid, datetime, purpose, status) VALUES (?, ?, ?, ?, 'pending')";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $studentId);
        $stmt->bindParam(2, $facultyId);
        $stmt->bindParam(3, $datetime);
        $stmt->bindParam(4, $purpose);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function getAppointmentsByStudentId($studentId) {
        // Updated to include faculty's name
        $query = "SELECT a.*, fp.name as faculty_name FROM " . $this->table_name . " a
                  JOIN faculty_professors fp ON a.facultyid = fp.facultyid
                  WHERE a.studentid = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $studentId);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
?>
