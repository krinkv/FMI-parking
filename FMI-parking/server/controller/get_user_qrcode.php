<?php
require_once("../repository/database_queries.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    session_start();
    $curr_user = $_SESSION["user"];
    $email = $curr_user->getEmail();
    $image_name = $email.".png";

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "image_name" => $image_name]));
}
?>