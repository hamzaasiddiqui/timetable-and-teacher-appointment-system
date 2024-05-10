<?php
require_once '../cors.php';
require_once '../model/Database.php';
require_once '../model/Faculty.php';

header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$database = new Database();
$db = $database->getConnection();
$faculty = new Faculty($db);

$result = $faculty->getAllFaculty();
$professors = [];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($professors, $row);
}

if (empty($professors)) {
    echo json_encode(["message" => "No professors found."]);
} else {
    echo json_encode($professors);
}
?>
