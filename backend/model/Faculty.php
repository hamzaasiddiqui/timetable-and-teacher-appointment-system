<?php
require_once '../cors.php';

class Faculty {
    private $conn;
    private $table_name = "FACULTY_PROFESSORS";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getFacultyData($facultyID) {
        $query = "SELECT facultyid, password, departmentid FROM " . $this->table_name . " WHERE facultyid = :facultyid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':facultyid', $facultyID);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllFaculty() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function addFaculty($facultyId, $name, $departmentId, $password) {
        $query = "INSERT INTO " . $this->table_name . " (facultyid, name, departmentid, password) VALUES (:facultyid, :name, :departmentid, :password)";
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(':facultyid', $facultyId);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':departmentid', $departmentId);
        $stmt->bindParam(':password', $password);
    
        if ($stmt->execute()) {
            return true;
        }
    
        return false;
    }

    public function isProfessorAssigned($facultyId) {
        $query = "SELECT COUNT(*) AS assigned_count FROM course WHERE assignedfacultyid = :facultyId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':facultyId', $facultyId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['assigned_count'] > 0;
    }
    
    public function removeFaculty($facultyId) {
        $query = "DELETE FROM " . $this->table_name . " WHERE facultyid = :facultyId";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':facultyId', $facultyId);
        return $stmt->execute();
    }
}
?>
