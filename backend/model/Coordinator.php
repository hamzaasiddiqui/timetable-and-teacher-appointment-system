<?php
require_once '../cors.php';

class Coordinator {
    private $conn;
    private $table_name = "COORDINATOR";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getCoordinatorData($coordinatorID) {
        $query = "SELECT coordinatorid, password, departmentid FROM " . $this->table_name . " WHERE coordinatorid = :coordinatorid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':coordinatorid', $coordinatorID);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
