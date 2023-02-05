<?php 
require_once("../repository/database_queries.php");
require_once("../model/user.php");
include("../qrcode/phpqrcode/qrlib.php");

$input_data = file_get_contents("php://input");
$user_data = json_decode($input_data, true); // validation

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $userFirstname = $user_data["first_name"];
    $userLastname = $user_data["last_name"];
    $userEmail = $user_data["email"];
    $userPassword = password_hash($user_data["password"], PASSWORD_BCRYPT);
    $userStatus = $user_data["status"];
    $userGender = $user_data["gender"];
    $userCarNumber = $user_data["car_number"];

    if (DatabaseQueries::checkUserByValue('email', $userEmail)){

        http_response_code(400);
        exit(json_encode(["status" => "ERROR", "message" => "Email already taken !"]));

    } else {

        $user = new User($userFirstname, $userLastname, $userEmail, $userPassword, $userStatus, $userGender, $userCarNumber);

        $path = "../qrcode/generated/" . $userEmail;
        $file = $path.".png";
        $ecc = 'H';
        $pixel_size = 20;
        $frame_size = 5;
        QRcode::png($userEmail, $file, $ecc, $pixel_size, $frame_size);

        DatabaseQueries::saveUser($user); // validation

        session_start();
        $_SESSION["user"] = $user;

        http_response_code(200);
        exit(json_encode(["status" => "SUCCESS", "message" => "Successfull registration"]));
    }
}

// $userFirstname = $user_data["first_name"];
// $userLastname = $user_data["last_name"];
// $userEmail = $user_data["email"];
// $userPassword = $user_data["password"];
// $userStatus = $user_data["status"];
// $userGender = $user_data["gender"];
// $userCarNumber = $user_data["car_number"];

// // Hash password, Validation
// $user = new User($userFirstname, $userLastname, $userEmail, $userPassword, $userStatus, $userGender, $userCarNumber);

// $user_db = getUserByEmail($email); // validation

// session_start();
// $_SESSION["user"] = $user_db;

// setcookie("email", $user["email"], time() + 1000, "/");
// setcookie("password", $user["password"], time() + 1000, "/");

// http_response_code(200);
// exit(json_encode(["status" => "SUCCESS", "message" => "Successfull registration"]));
?>