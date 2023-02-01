<?php 
require_once("../repository/database_queries.php");

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $email = $user_data['email'];
    $password = $user_data['password'];

    if(!DatabaseQueries::checkUserByValue('email', $email)) {
      http_response_code(401);
      exit(json_encode(["status" => "ERROR", "message" => "Грешен имейл или парола!"]));
    }

    $user_db = DatabaseQueries::getUserByEmail($email); // validation
    $user_db_password = $user_db->getPassword();

    if(!password_verify($password, $user_db_password)) {
      http_response_code(401);
      exit(json_encode(["status" => "ERROR", "message" => "Грешен имейл или парола!"]));
    }

    session_start();
    $_SESSION["user"] = $user_db;

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Успешен вход в профила!", "role" => $user_db->getStatus()]));
  }
?>