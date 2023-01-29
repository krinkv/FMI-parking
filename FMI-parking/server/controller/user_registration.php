<?php 
require_once("../repository/database_queries.php");
require_once("../model/user.php");

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

$userFirstname = $user_data["first_name"];
$userLastname = $user_data["last_name"];
$userEmail = $user_data["email"];
$userPassword = $user_data["password"];
$userStatus = $user_data["status"];
$userGender = $user_data["gender"];
$userCarNumber = $user_data["car_number"];

// Hash password, Validation
$user = new User($userFirstname, $userLastname, $userEmail, $userPassword, $userStatus, $userGender, $userCarNumber);

$user_db = getUserByEmail($email); // validation

session_start();
$_SESSION["user"] = $user_db;

setcookie("email", $user["email"], time() + 1000, "/");
setcookie("password", $user["password"], time() + 1000, "/");

http_response_code(200);
exit(json_encode(["status" => "SUCCESS", "message" => "Successfull registration"]));
?>