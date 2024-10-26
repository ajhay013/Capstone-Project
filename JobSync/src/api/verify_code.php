<?php
include 'dbconnect.php'; 
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception;
require '../../vendor/autoload.php'; 
session_start();
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
$objDb = new Dbconnect;
$conn = $objDb->connect(); // Ensure this returns a PDO instance

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.'];

header('Content-Type: application/json');

if ($method == 'POST') {
    if (isset($_POST["email"]) && isset($_POST["verification_code"])) {
        $email = $_POST["email"];
        $verification_code = $_POST["verification_code"];

        $sql = "SELECT * FROM js_applicants WHERE email = :email AND verification_code = :verification_code";
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':verification_code', $verification_code);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $updateSql = "UPDATE js_applicants SET email_verified_at = NOW() WHERE email = :email";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bindParam(':email', $email);

            if ($updateStmt->execute()) {
                $_SESSION['registration_successful'] = true;
                $response = [
                    "status" => 1,
                    "message" => "Your email has been verified successfully!"
                ];
            } else {
                $response = [
                    "status" => 0,
                    "message" => "Failed to update verification status."
                ];
            }
        } else {
            $response = [
                "status" => 0,
                "message" => "Invalid verification code or email. Please try again."
            ];
        }
    } else {
        $response = [
            "status" => 0,
            "message" => "Email and verification code are required."
        ];
    }
} else {
    $response = [
        "status" => 0,
        "message" => "Invalid request method."
    ];
}

echo json_encode($response);
?>
