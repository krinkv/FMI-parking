<?php
include '../configuration/database_configuration.php';
include '../model/user.php';

class DatabaseQueries
{
    public static function saveUser(User $user)
    {
        // Validation if there already is such user
        $table = "users";
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
        $preparedSql = $connection->prepare($sql);
        $preparedSql->bindParam(':firstname', $userFirstname);
        $preparedSql->bindParam(':lastname', $userLastname);
        $preparedSql->bindParam(':email', $userEmail);
        $preparedSql->bindParam(':password', $userPassword);
        $preparedSql->bindParam(':status', $userStatus);
        $preparedSql->bindParam(':gender', $userGender);
        $preparedSql->bindParam(':carNumber', $userCarNumber);
        $preparedSql->execute(); // Think how to handle errors !!!
    }

    public static function getUserByEmail($email)
    {
        $table = "users";
        $sql = "SELECT * FROM $table WHERE email = :email;";

        $connection = getDatabaseConnection();
        $resultSet = $connection->prepare($sql);
        $resultSet->bindParam(':email', $email);
        $resultSet->execute(); // Think how to handle errors !!!
        $user = $resultSet->fetch(PDO::FETCH_ASSOC);

        return new User($user["first_name"], $user["last_name"], $user["email"], $user["password"], $user["status"], $user["gender"], $user["car_number"]);
    }
}