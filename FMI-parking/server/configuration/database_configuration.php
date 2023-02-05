<?php

$configs = array(
    'host' => 'localhost',
    'username' => 'root',
    'password' => "",
    'database_name' => "fmi_parking",
);

function getDatabaseConnection()
{
    global $configs;
    $host = $configs['host'];
    $dbname = $configs['database_name'];
    $username = $configs['username'];
    $password = $configs['password'];

    $connection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    return $connection;
}
