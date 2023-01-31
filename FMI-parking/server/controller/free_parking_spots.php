<?php 
require_once("../repository/database_queries.php");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $countAll = DatabaseQueries::getNumberOfParkingSpots();
    $countTaken = DatabaseQueries::getNumberOfTakenSpotsNow();

    http_response_code(200);
    exit(json_encode(["free_spots_now" => $countAll - $countTaken]));
}
?>