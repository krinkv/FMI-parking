<?php 
require_once("../repository/database_queries.php");

$input_data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $type = $input_data["user_type"];
    $count = DatabaseQueries::getNumberOfTakenSpotsNowByUserType($type);

    http_response_code(200);
    exit(json_encode(["taken_spots" => $count]));
}
?>