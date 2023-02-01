<?php 
require_once("../repository/database_queries.php");

// INPUT - subjectName, startTime, endTime, day, email
// OUTPUT - SUCCESSFUL OR NOT RESERVATION

$input_data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();

    if (!array_key_exists("user", $_SESSION)) {
        http_response_code(401);
        exit(json_encode(["status" => "ERROR", "message" => "Моля първо се впишете !"]));
    }

    $user = $_SESSION["user"];

    if ($user->getStatus() != "ADMIN") {
        http_response_code(401);
        exit(json_encode(["status" => "ERROR", "message" => "Трябва да сте администратор !"]));
    }

    DatabaseQueries::addCourse($input_data["subjectName"], $input_data["day"], $input_data["startTime"], $input_data["endTime"], $input_data["email"]);

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Успешена резервация на пркомясто!"]));
}
?>