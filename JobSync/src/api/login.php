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
        // Prepare the SQL statement with a placeholder
        $stmt_applicant = $conn->prepare("SELECT applicant_id, firstname, password FROM js_applicants WHERE email = :email");
        
        // Bind the parameter
        $stmt_applicant->bindParam(':email', $email, PDO::PARAM_STR);
        
        $stmt_applicant->execute();
        
        if ($stmt_applicant->rowCount() > 0) {
            // Fetch the data
            $applicant = $stmt_applicant->fetch(PDO::FETCH_ASSOC);
            $id = $applicant['applicant_id'];
            $firstname = $applicant['firstname'];
            $hashed_password = $applicant['password'];

            // Verify the password
            if (password_verify($password, $hashed_password)) {
                // Start a session for the user
                $_SESSION['applicant_id'] = $id;
                $_SESSION['firstname'] = $firstname;
            
                echo json_encode(["success" => true, "applicant_id" => $id, "message" => "Login successful."]); // Include applicant_id
                exit();
            }
             else {
                // Password is incorrect
                echo json_encode(["success" => false, "error" => "Incorrect password."]);
                exit();
            } else {
                // Password is incorrect
                echo json_encode([
                    "success" => false, 
                    "error" => "Incorrect password."
                ]);
                exit();
            }
        } else {
            // Email does not exist
            echo json_encode(["success" => false, "error" => "Incorrect email."]);
            exit();
        }

    } catch (PDOException $e) {
        error_log("Database Query Error: " . $e->getMessage());
        echo json_encode(["error" => "An error occurred. Please try again later."]);
        exit();
    }
} else {
    // Log the condition not met
    error_log("Condition not met for POST request");
    if (!isset($_POST['email'])) {
        error_log("No email provided in the request.");
    }
    echo json_encode(["success" => false, "error" => "INVALID email or password. Please try again."]);
    exit();
}