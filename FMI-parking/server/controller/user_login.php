<?php 
require_once("../repository/database_queries.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $email = $_POST['email'];
    $password = $_POST['password'];

    $user_db = getUserByEmail($email); // validation

    // Check if password is correct

    session_start();
    $_SESSION["user"] = $db_user;

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Successfull login"]));
  }
?>