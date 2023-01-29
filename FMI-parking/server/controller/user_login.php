<?php 
require_once("../repository/database_queries.php");

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

$email = $user_data["email"];
$password = $user_data["password"];

$user_db = getUserByEmail($email); // validation

// Check if password is correct

session_start();
$_SESSION["user"] = $db_user;

setcookie("email", $user["email"], time() + 1000, "/");
setcookie("password", $user["password"], time() + 1000, "/");

http_response_code(200);
exit(json_encode(["status" => "SUCCESS", "message" => "Successfull login"]));
?>