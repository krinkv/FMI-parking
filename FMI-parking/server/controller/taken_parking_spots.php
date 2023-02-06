<?php 
require_once("../repository/database_queries.php");

// INPUT - start_time, end_time
// OUTPUT - taken spots in given interval

$input_data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taken_spots = DatabaseQueries::getTakenSpotsInTimeRange($input_data["start_time"], $input_data["end_time"]);

    http_response_code(200);
    exit(json_encode(["taken_spots" => $taken_spots]));
}
?>