<?php
class Course {
    private $title;
    private $day;
    private $startTime;
    private $endTime;

    public function __construct($title, $day, $startTime, $endTime)
    {
        $this->title = $title;
        $this->day = $day;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
    }

    function getTitle()
    {
        return $this->title;
    }

    function setTitle($title)
    {
        $this->title = $title;
    }
    
    public function getDay()
    {
        return $this->day;
    }

    public function setDay($day)
    {
        $this->day = $day;
    }

    public function getStartTime()
    {
        return $this->startTime;
    }

    public function setStartTime($startTime)
    {
        $this->startTime = $startTime;
    }

    public function getEndTime()
    {
        return $this->endTime;
    }

    public function setEndTime($endTime)
    {
        $this->endTime = $endTime;
    }
}