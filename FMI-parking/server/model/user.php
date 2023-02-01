<?php
class User
{
    private $userId;
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $status;
    private $gender;
    private $carNumber;

    public function __construct($firstName, $lastName, $email, $password, $status, $gender, $carNumber)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->status = $status;
        $this->gender = $gender;
        $this->carNumber = $carNumber;
    }

    public function getFirstName()
    {
        return $this->firstName;
    }

    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    public function getLastName()
    {
        return $this->lastName;
    }

    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function getGender()
    {
        return $this->gender;
    }

    public function setGender($gender)
    {
        $this->gender = $gender;
    }

    public function getCarNumber()
    {
        return $this->carNumber;
    }

    public function setCarNumber($carNumber)
    {
        $this->carNumber = $carNumber;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function setUserId($userId)
    {
        $this->userId = $userId;
    }
}