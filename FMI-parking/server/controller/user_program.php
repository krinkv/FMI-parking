<?php 
require_once("../repository/database_queries.php");

session_start();

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $userId = $_SESSION["user"] -> getUserId();
    $program = DatabaseQueries::getUserProgram($userId);

    http_response_code(200);
    exit(json_encode(["program" => $program]));
}
?>