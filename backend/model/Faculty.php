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
}
?>
