<?php 
require_once("../repository/database_queries.php");


// FILE, testing the generic user query in database_queries, will be removed when done

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $user_id = $user_data['user_id'];

    $user_db = DatabaseQueries::getUserByValue('user_id', $user_id); // validation

    // Check if password is correct

    // session_start();
    // $_SESSION["user"] = $db_user;

    http_response_code(200);
    // exit(json_encode(["status" => "SUCCESS", "message" => "Successfull login"]));
    // echo json_encode($user_db);
    exit(json_encode(["name" => $user_db->getFirstName()]));
  }
?>