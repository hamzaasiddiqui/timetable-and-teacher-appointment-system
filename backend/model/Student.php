<?php
require_once '../cors.php';

class Student {
    private $conn;
    private $table_name = "STUDENT";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getStudentData($studentID) {
        $query = "SELECT studentid, password, name, major, facultyid FROM " . $this->table_name . " WHERE studentid = :studentid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':studentid', $studentID);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function addStudent($studentId, $name, $major, $departmentId) {
        $password = password_hash('student', PASSWORD_DEFAULT);
        $query = "INSERT INTO " . $this->table_name . " (studentid, name, major, facultyid, password) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $studentId);
        $stmt->bindParam(2, $name);
        $stmt->bindParam(3, $major);
        $stmt->bindParam(4, $departmentId);
        $stmt->bindParam(5, $password);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function deleteStudent($studentId) {
        $query = "DELETE FROM " . $this->table_name . " WHERE studentid = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $studentId);
        return $stmt->execute();
    }

    public function verifyPassword($studentId, $currentPassword) {
        $query = "SELECT password FROM " . $this->table_name . " WHERE studentid = :studentid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':studentid', $studentId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return password_verify($currentPassword, $result['password']);
    }

    public function changePassword($studentId, $newPassword) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $query = "UPDATE " . $this->table_name . " SET password = :password WHERE studentid = :studentid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':studentid', $studentId);
        return $stmt->execute();
    }
}
?>

