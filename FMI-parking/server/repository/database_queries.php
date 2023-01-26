<?php
include '../configuration/database_configuration.php';
include '../model/user.php';

class DatabaseQueries
{
    public static function saveUser(User $user)
    {
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
        $preparedSql->execute() or Utils::showMessage(MessageUtils::DATABASE_SAVE_INFORMATION_ERROR_MESSAGE, false);
    }
}