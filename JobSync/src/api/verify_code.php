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

// Ensure that the request is POST
if ($method == 'POST') {
    if (isset($_POST["email"]) && isset($_POST["verification_code"])) {
        // Use prepared statements with PDO
        $email = $_POST["email"];
        $verification_code = $_POST["verification_code"];

        // Prepare the SQL statement
        $sql = "SELECT * FROM applicants WHERE email = :email AND verification_code = :verification_code";
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':verification_code', $verification_code);

        // Execute the statement
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // Update the email_verified_at field
            $updateSql = "UPDATE applicants SET email_verified_at = NOW() WHERE email = :email";
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
            // Invalid verification code or email
            $response = [
                "status" => 0,
                "message" => "Invalid verification code or email. Please try again."
            ];
        }
    } else {
        // Missing email or verification code in POST request
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
