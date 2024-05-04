<?php
require_once '../cors.php';

class Course {
    private $conn;
    public $table_name = "COURSE";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllCourses() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function allocateProfessorToCourse($courseId, $facultyId) {
        $query = "UPDATE " . $this->table_name . " SET assignedfacultyid = :facultyId WHERE courseid = :courseId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':facultyId', $facultyId);
        $stmt->bindParam(':courseId', $courseId);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
