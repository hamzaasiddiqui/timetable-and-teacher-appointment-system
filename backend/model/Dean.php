<?php
require_once '../cors.php';

class Dean {
    private $conn;
    private $table_name = "DEAN";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getDeanData($deanID) {
        $query = "SELECT deanid, password, departmentid FROM " . $this->table_name . " WHERE deanid = :deanid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':deanid', $deanID);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
