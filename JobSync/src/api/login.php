<?php
session_start();
include 'dbconnect.php';

$objDb = new Dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.'];

if ($method === 'POST' && isset($_POST['email'], $_POST['password'], $_POST['formType'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $formType = $_POST['formType']; 

    try {
        switch ($formType) {
            case 'candidate':
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
                break;

                case 'employer':
                    $stmt_employer = $conn->prepare("
                        SELECT 
                            e.employer_id, 
                            e.firstname, 
                            e.password
                        FROM 
                            js_employer_info e 
                        WHERE 
                            e.email = :email
                    ");
                    $stmt_employer->bindParam(':email', $email, PDO::PARAM_STR);
                    $stmt_employer->execute();
                
                    if ($stmt_employer->rowCount() > 0) {
                        $employer = $stmt_employer->fetch(PDO::FETCH_ASSOC);
                        $id = $employer['employer_id'];
                        $firstname = $employer['firstname'];
                        $hashed_password = $employer['password'];
                
                        if (password_verify($password, $hashed_password)) {
                            $_SESSION['employer_id'] = $id;
                            $_SESSION['firstname'] = $firstname;
                
                            $profileIncomplete = false;
                
                            $stmt_company_info = $conn->prepare("SELECT 1 FROM js_company_info WHERE employer_id = :id");
                            $stmt_company_info->bindParam(':id', $id, PDO::PARAM_INT);
                            $stmt_company_info->execute();
                            if ($stmt_company_info->rowCount() == 0) {
                                $profileIncomplete = true;
                            }
                
                            $response = [
                                "success" => true,
                                "employer_id" => $id,
                                "firstname" => $firstname,
                                "userType" => 'employer',
                                "message" => "Login successful.",
                                "profileIncomplete" => $profileIncomplete
                            ];
                
                            echo json_encode($response);
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
                    break;
                

            default:
                echo json_encode([
                    "success" => false, 
                    "error" => "Invalid user type."
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
