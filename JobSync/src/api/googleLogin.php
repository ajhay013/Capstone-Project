<?php
session_start(); 
include 'dbconnect.php';
header('Content-Type: application/json');

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$given_name = $data['given_name'];  
$family_name = $data['family_name'];  
$profile_picture = $data['profile_picture'];
$formType = $data['formType'];

if ($formType !== 'candidate') {
    echo json_encode(['error' => 'Invalid form type']);
    exit();
}

try {
    $query = "SELECT * FROM js_applicants WHERE email = :email";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $applicant = $stmt->fetch(PDO::FETCH_ASSOC);
        $id = $applicant['applicant_id'];
        $firstname = $applicant['firstname'];
        $profile_picture_db = $applicant['profile_picture']; 

        if (empty($profile_picture_db)) {
            $updateQuery = "UPDATE js_applicants SET profile_picture = :profile_picture WHERE email = :email";
            $updateStmt = $conn->prepare($updateQuery);
            $updateStmt->bindParam(':profile_picture', $profile_picture, PDO::PARAM_STR);
            $updateStmt->bindParam(':email', $email, PDO::PARAM_STR);
            $updateStmt->execute();
        }

        $_SESSION['applicant_id'] = $id;
        $_SESSION['firstname'] = $firstname;

        echo json_encode([
            'success' => true, 
            'applicant_id' => $id, 
            'firstname' => $firstname,
            'profile_picture' => $profile_picture_db, 
            'userType' => 'applicant', 
            'message' => 'Login successful.'
        ]);
        exit();
    } else {
        $insertQuery = "INSERT INTO js_applicants (email, firstname, lastname, profile_picture) 
                        VALUES (:email, :given_name, :family_name, :profile_picture)";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bindParam(':email', $email, PDO::PARAM_STR);
        $insertStmt->bindParam(':given_name', $given_name, PDO::PARAM_STR);
        $insertStmt->bindParam(':family_name', $family_name, PDO::PARAM_STR);
        $insertStmt->bindParam(':profile_picture', $profile_picture, PDO::PARAM_STR);

        if ($insertStmt->execute()) {
            $lastInsertedId = $conn->lastInsertId();

            $insertPersonalInfoQuery = "INSERT INTO js_personal_info (applicant_id) 
                                        VALUES (:applicant_id)";
            $insertPersonalInfoStmt = $conn->prepare($insertPersonalInfoQuery);
            $insertPersonalInfoStmt->bindParam(':applicant_id', $lastInsertedId, PDO::PARAM_INT);
            $insertPersonalInfoStmt->execute();

            $_SESSION['applicant_id'] = $lastInsertedId;
            $_SESSION['firstname'] = $given_name;

            echo json_encode([
                'success' => true, 
                'applicant_id' => $lastInsertedId, 
                'firstname' => $given_name,
                'userType' => 'applicant',  
                'message' => 'User saved and logged in successfully'
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save user']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database query failed: ' . $e->getMessage()]);
}
?>
