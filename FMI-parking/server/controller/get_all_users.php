<?php
require_once("../repository/database_queries.php");

if($_SERVER["REQUEST_METHOD"] == "POST")) {
    $users = DatabaseQuery::getAllUsers();
    http_response_code(200);
    exit(json_encode(["users" => $users]));
}
?>