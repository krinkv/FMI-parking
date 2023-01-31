<?php
include '../configuration/database_configuration.php';
include '../model/user.php';

class DatabaseQueries
{
    public static function saveUser(User $user)
    {
        // Validation if there already is such user
        $table = "user";
        $sql = "INSERT INTO $table (first_name, last_name, email, password, status, gender, car_number) 
                        VALUES (:firstname, :lastname, :email, :password, :status, :gender, :carNumber);";

        $userFirstname = $user->getFirstName();
        $userLastname = $user->getLastName();
        $userEmail = $user->getEmail();
        $userPassword = $user->getPassword();
        $userStatus = $user->getStatus();
        $userGender = $user->getGender();
        $userCarNumber = $user->getCarNumber();
        
        $connection = getDatabaseConnection();
        if (!$connection) {
            throw new Exception("Unable to connect to the database.");
        }

        $preparedSql = $connection->prepare($sql);
        $preparedSql->bindParam(':firstname', $userFirstname);
        $preparedSql->bindParam(':lastname', $userLastname);
        $preparedSql->bindParam(':email', $userEmail);
        $preparedSql->bindParam(':password', $userPassword);
        $preparedSql->bindParam(':status', $userStatus);
        $preparedSql->bindParam(':gender', $userGender);
        $preparedSql->bindParam(':carNumber', $userCarNumber);
        if (!$preparedSql->execute()) {
            throw new Exception("Unable to execute the query.");
        }
    }

    public static function getUserByEmail($email)
    {
        $table = "user";
        $sql = "SELECT * FROM $table WHERE email = :email;";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':email', $email);
        $resultSet->execute(); // Think how to handle errors !!!
        $user = $resultSet->fetch(PDO::FETCH_ASSOC);

        return new User($user["user_id"], $user["first_name"], $user["last_name"], $user["email"], $user["password"], $user["status"], $user["gender"], $user["car_number"]);
    }

    public static function getUserByValue($fieldName, $fieldValue)
    {
        $table = "user";
        $sql = "SELECT * FROM $table WHERE " . $fieldName ." = :fieldValue;";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':fieldValue', $fieldValue);
        $resultSet->execute(); // Think how to handle errors !!!
        $user = $resultSet->fetch(PDO::FETCH_ASSOC);

        return new User($user["first_name"], $user["last_name"], $user["email"], $user["password"], $user["status"], $user["gender"], $user["car_number"]);
    }

    public static function checkUserByValue($fieldName, $fieldValue)
    {
        $table = "user";
        $sql = "SELECT * FROM $table WHERE " . $fieldName ." = :fieldValue;";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':fieldValue', $fieldValue);
        $resultSet->execute(); // Think how to handle errors !!!
        $user = $resultSet->fetch(PDO::FETCH_ASSOC);

        return !empty($user);
    }

    public static function getNumberOfParkingSpots()
    {
        $table = "parking_spot";
        $sql = "SELECT COUNT(*) FROM $table";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->execute(); // Think how to handle errors !!!
        $count = $resultSet->fetch(PDO::FETCH_ASSOC);

        return $count["COUNT(*)"];
    }

    public static function getNumberOfTakenSpotsNow()
    {
        $table = "user_parking_spot_info";
        $sql = "SELECT COUNT(*) FROM $table WHERE start_time <= NOW() AND end_time >= NOW()";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->execute(); // Think how to handle errors !!!
        $count = $resultSet->fetch(PDO::FETCH_ASSOC);

        return $count["COUNT(*)"];
    }

    public static function getNumberOfTakenSpotsNowByUserType($userType)
    {
        $table1 = "user_parking_spot_info";
        $table2 = "user";
        $sql = "SELECT COUNT(*) FROM user_parking_spot_info t1 JOIN user t2 ON t1.user_id = t2.user_id 
        WHERE t1.start_time <= NOW() AND t1.end_time >= NOW() AND t2.status = :userType";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':userType', $userType);
        $resultSet->execute(); // Think how to handle errors !!!
        $count = $resultSet->fetch(PDO::FETCH_ASSOC);

        return $count["COUNT(*)"];
    }

    public static function getUserProgram($userId) {
        
        $sql = "SELECT c.title, c.start_time, c.end_time  FROM `user` u 
            JOIN users_courses uc ON u.user_id = uc.user_id
            JOIN course c ON uc.course_id = c.course_id
            WHERE u.user_id = :userId";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':userId', $userId);
        $resultSet->execute(); // Think how to handle errors !!!
        $result = $resultSet->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}