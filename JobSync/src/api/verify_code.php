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
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.'];

header('Content-Type: application/json');

if ($method == 'POST') {
    if (isset($_POST["email"]) && isset($_POST["verification_code"]) && isset($_POST["formType"])) {
        $email = $_POST["email"];
        $verification_code = $_POST["verification_code"];
        $formType = $_POST["formType"]; 

        $checkSql = "SELECT email_verified_at FROM js_applicants WHERE email = :email";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bindParam(':email', $email);
        $checkStmt->execute();
        $user = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $user['email_verified_at'] !== null) {
            $response = [
                "status" => 0,
                "message" => "Your email is already verified."
            ];
        } else {
            $sql = "SELECT * FROM js_applicants WHERE email = :email AND verification_code = :verification_code";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':verification_code', $verification_code);
            $stmt->execute();

            switch ($formType) {
                case 'applicant':
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
                    break;

                case 'employer':
                    $sqlEmployer = "SELECT * FROM js_employer_info WHERE email = :email AND verification_code = :verification_code";
                    $stmtEmployer = $conn->prepare($sqlEmployer);
                    $stmtEmployer->bindParam(':email', $email);
                    $stmtEmployer->bindParam(':verification_code', $verification_code);
                    $stmtEmployer->execute();

                    if ($stmtEmployer->rowCount() > 0) {
                        $updateSqlEmployer = "UPDATE js_employer_info SET email_verified_at = NOW() WHERE email = :email";
                        $updateStmtEmployer = $conn->prepare($updateSqlEmployer);
                        $updateStmtEmployer->bindParam(':email', $email);

                        if ($updateStmtEmployer->execute()) {
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
                            "message" => "Invalid verification code or email for employer. Please try again."
                        ];
                    }
                    break;

                default:
                    $response = [
                        "status" => 0,
                        "message" => "Invalid form type."
                    ];
                    break;
            }
        }
    } else {
        $response = [
            "status" => 0,
            "message" => "Email, verification code, and form type are required."
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
