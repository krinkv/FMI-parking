<?php 
require_once("../repository/database_queries.php");

// INPUT - parking_spot_id, start_time, end_time
// OUTPUT - SUCCESSFUL OR NOT RESERVATION

$input_data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();

    if (!array_key_exists("user", $_SESSION)) {
        http_response_code(401);
        exit(json_encode(["status" => "ERROR", "message" => "Моля първо се впишете !"]));
    }

    $user = $_SESSION["user"];
    $is_free = DatabaseQueries::isSpotFreeForTimeSlot($input_data["parking_spot_id"], $input_data["start_time"], $input_data["end_time"]);
    
    if (!$is_free) {
        http_response_code(401);
        exit(json_encode(["status" => "ERROR", "message" => "Мястото не е свободно за това време !"]));
    }

    $d1 = new DateTime($input_data["start_time"]);
    $d2 = new DateTime($input_data["end_time"]);

    if ($d1 >= $d2) {
        http_response_code(401);
        exit(json_encode(["status" => "ERROR", "message" => "Началният час трябва да е преди крайния !"]));
    }

    DatabaseQueries::reserveParkingSpot($user->getUserId(), $input_data["parking_spot_id"], $input_data["start_time"], $input_data["end_time"]);

    http_response_code(200);
    exit(json_encode(["status" => "SUCCESS", "message" => "Успешена резервация на пркомясто!"]));
}
?>