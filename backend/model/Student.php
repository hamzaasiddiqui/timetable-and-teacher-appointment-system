<?php
require_once '../cors.php';

class Student {
    private $conn;
    private $table_name = "STUDENT";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getStudentData($studentID) {
        $query = "SELECT studentid, password FROM " . $this->table_name . " WHERE studentid = :studentid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':studentid', $studentID);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
