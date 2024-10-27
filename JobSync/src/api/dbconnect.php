<?php 
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // Exit for preflight requests
}

// Database connection class
class Dbconnect {
    private $server = 'localhost';
    private $dbname = 'db_jobsync';
    private $user = 'root';
    private $pass = '';
    
    public function connect() {
        try {
            $conn = new PDO('mysql:host=' . $this->server . ';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\PDOException $e) {
            error_log("Database Error: " . $e->getMessage());
            echo json_encode(["error" => "Database connection error."]);
            http_response_code(500); 
            exit; 
        }
    }
}
