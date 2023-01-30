<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

require_once("../repository/database_queries.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"));
    // collect value of input field
    $user_db = DatabaseQueries::getUserByEmail($data->email); // validation

    // Check if password is correct

    session_start();
    $_SESSION["user"] = $db_user;

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Successfull login"]));
  }
?>