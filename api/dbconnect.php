<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

    class Dbconnect {
        private $server = 'localhost';
        private $dbname = 'sample-react';
        private $user = 'root';
        private $pass = '';
        
        public function connect() {
            try {
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
        }

    }