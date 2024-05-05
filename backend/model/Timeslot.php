<?php
require_once '../cors.php';

class Timeslot {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function deleteTimeslotsByTimetableId($timetableID) {
        $stmt = $this->conn->prepare("DELETE FROM timeslot WHERE timetableid = ?");
        $stmt->execute([$timetableID]);
    }

    public function saveTimeslot($timetableID, $courseId, $startTime, $endTime, $day, $location) {
        $query = "INSERT INTO timeslot (timetableid, courseid, starttime, endtime, day, location) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$timetableID, $courseId, $startTime, $endTime, $day, $location]);
    }
}
?>
