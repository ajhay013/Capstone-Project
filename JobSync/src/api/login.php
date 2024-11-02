<?php
session_start();
include 'dbconnect.php';

$objDb = new Dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];

$response = ['status' => 0, 'message' => 'Invalid request.'];

if ($method === 'POST' && isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    try {
        $stmt_applicant = $conn->prepare("
        SELECT 
            a.applicant_id, 
            a.firstname, 
            p.profile_picture,
            a.password
        FROM 
            js_applicants a 
        JOIN 
            js_personal_info p ON a.applicant_id = p.applicant_id 
        WHERE 
            a.email = :email
    ");
    
        $stmt_applicant->bindParam(':email', $email, PDO::PARAM_STR);

        $stmt_applicant->execute();

        if ($stmt_applicant->rowCount() > 0) {
            $applicant = $stmt_applicant->fetch(PDO::FETCH_ASSOC);
            $id = $applicant['applicant_id'];
            $firstname = $applicant['firstname'];
            $profile_picture = $applicant['profile_picture']; 
            $hashed_password = $applicant['password'];
        
            if (password_verify($password, $hashed_password)) {
                $_SESSION['applicant_id'] = $id;
                $_SESSION['firstname'] = $firstname;
        
                echo json_encode([
                    "success" => true,
                    "applicant_id" => $id,
                    "firstname" => $firstname,
                    "profile_picture" => $profile_picture,
                    "userType" => 'applicant',
                    "message" => "Login successful."
                ]);
                exit();
            } else {
                echo json_encode([
                    "success" => false, 
                    "error" => "Incorrect password."
                ]);
                exit();
            }
        } else {
            echo json_encode([
                "success" => false, 
                "error" => "Incorrect email."
            ]);
            exit();
        }

    } catch (PDOException $e) {
        error_log("Database Query Error: " . $e->getMessage());
        echo json_encode(["error" => "An error occurred. Please try again later."]);
        exit();
    }
} else {
    error_log("Condition not met for POST request");
    if (!isset($_POST['email'])) {
        error_log("No email provided in the request.");
    }
    echo json_encode([
        "success" => false, 
        "error" => "Invalid request. Please provide valid credentials."
    ]);
    exit();
}
