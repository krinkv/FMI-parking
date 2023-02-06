<?php 
require_once("../repository/database_queries.php");

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $email = $user_data['email'];
    $status = $user_data['status'];

    if(!DatabaseQueries::checkUserByValue('email', $email)) {
      http_response_code(404);
      exit(json_encode(["status" => "ERROR", "message" => "Не е намерен потребител с този имейл"]));
    }

    DatabaseQueries::updateUserStatus($email, $status);

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Успешна промяна на статуса"]));
  }
?>