START TRANSACTION;

SET
    time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `fmi_parking` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `fmi_parking`;

CREATE TABLE `user` (
    `user_id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NOT NULL,
    `last_name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
    `status` enum('ADMIN', 'FULL_TIME_LECTURER', 'CONTRACT_LECTURER', 'RESTRICTED_ACESS') NOT NULL DEFAULT 'RESTRICTED_ACESS',
    `gender` enum('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE',
    `car_number` varchar(8),
    PRIMARY KEY (user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `course` (
    `course_id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `day` enum(
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY'
    ) NOT NULL,
    `start_time` time NOT NULL,
    `end_time` time NOT NULL,
    PRIMARY KEY (course_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `parking_spot` (
    `parking_spot_id` int NOT NULL AUTO_INCREMENT,
    `number` int NOT NULL,
    `sector` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`parking_spot_id`),
    UNIQUE(`number`, `sector`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE `users_courses`(
    `course_id` int NOT NULL,
    `user_id` int NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (user_id) REFERENCES `user`(user_id),
    UNIQUE (course_id, user_id)
);

CREATE TABLE `user_parking_spot_info` (
    `user_id` int NOT NULL,
    `parking_spot_id` int NOT NULL,
    `start_time` datetime NOT NULL,
    `end_time` datetime NOT NULL-- ,
    FOREIGN KEY (parking_spot_id) REFERENCES parking_spot(parking_spot_id),
    FOREIGN KEY (user_id) REFERENCES `user`(user_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

COMMIT;