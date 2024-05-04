<?php
require_once '../cors.php';

class Faculty {
    private $conn;
    private $table_name = "FACULTY_PROFESSORS";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getFacultyData($facultyID) {
        $query = "SELECT facultyid, password FROM " . $this->table_name . " WHERE facultyid = :facultyid";
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
    
        // Bind parameters
        $stmt->bindParam(':facultyid', $facultyId);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':departmentid', $departmentId);
        $stmt->bindParam(':password', $password);
    
        // Execute the query
        if ($stmt->execute()) {
            return true;
        }
    
        return false;
    }
}
?>
