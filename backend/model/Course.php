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
        $this->conn->beginTransaction();
        
        try {
            $stmt = $this->conn->prepare("DELETE FROM timeslot WHERE courseid = ?");
            $stmt->execute([$courseId]);
    
            $query = "DELETE FROM " . $this->table_name . " WHERE courseid = :courseId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':courseId', $courseId);
            $stmt->execute();
    
            $this->conn->commit();
            return true;
        } catch (PDOException $e) {
            $this->conn->rollback();
            throw $e;
        }
    }

    public function unallocateProfessorFromCourse($courseId) {
        $query = "UPDATE " . $this->table_name . " SET assignedfacultyid = NULL WHERE courseid = :courseId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':courseId', $courseId);
        return $stmt->execute();
    }
    
}
?>
