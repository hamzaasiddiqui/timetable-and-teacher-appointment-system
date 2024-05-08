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

    public function deleteCourse($courseId) {
        // Start transaction
        $this->conn->beginTransaction();
        
        try {
            // Delete related timeslots first
            $stmt = $this->conn->prepare("DELETE FROM timeslot WHERE courseid = ?");
            $stmt->execute([$courseId]);
    
            // Then delete the course
            $query = "DELETE FROM " . $this->table_name . " WHERE courseid = :courseId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':courseId', $courseId);
            $stmt->execute();
    
            // Commit transaction
            $this->conn->commit();
            return true;
        } catch (PDOException $e) {
            // Rollback transaction on error
            $this->conn->rollback();
            throw $e; // Re-throw the exception to be handled in the controller
        }
    }
}
?>
