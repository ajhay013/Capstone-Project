<?php
include 'dbconnect.php';

$objDb = new Dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.']; 

