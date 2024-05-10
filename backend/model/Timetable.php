<?php
require_once '../cors.php';

class Timetable {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getOrCreateTimetableId($departmentId) {
        $query = "SELECT timetableid FROM timetable WHERE timetableid = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$departmentId]);
        if ($stmt->fetch(PDO::FETCH_ASSOC)) {
            return $departmentId;
        }

        $insertQuery = "INSERT INTO timetable (timetableid) VALUES (?)";
        $insertStmt = $this->conn->prepare($insertQuery);
        $insertStmt->execute([$departmentId]);
        return $departmentId;
    }
}
?>
