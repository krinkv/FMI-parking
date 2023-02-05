<?php
require_once("../repository/database_queries.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    session_start();
    $curr_user = $_SESSION["user"];
    $full_name = $curr_user->getFirstName()." ".$curr_user->getLastName();
    $role = $curr_user->getStatus();

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "name" => $full_name, "role" => $role]));
}
?>