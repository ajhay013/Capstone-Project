<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $input = json_decode(file_get_contents('php://input'), true);
    $applicant_id = $input['applicant_id'] ?? null;

    if (!$applicant_id) {
        echo json_encode(['success' => false, 'message' => 'Applicant ID is required.']);
        exit;
    }

    $applicantQuery = "SELECT * FROM js_applicants WHERE applicant_id = :applicant_id";
    $applicantStmt = $conn->prepare($applicantQuery);
    $applicantStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $applicantStmt->execute();
    $applicantResult = $applicantStmt->fetch(PDO::FETCH_ASSOC);

    if (!$applicantResult) {
        echo json_encode(['success' => false, 'message' => 'Applicant not found.']);
        exit;
    }
    $requiredApplicantFields = ['firstname', 'lastname', 'email', 'gender', 'contact', 'profile_picture'];

    $fieldNames = [
        'firstname' => 'First Name',
        'lastname' => 'Last Name',
        'email' => 'Email',
        'gender' => 'Gender',
        'contact' => 'Contact',
        'profile_picture' => 'Profile Picture'
    ];
    
    foreach ($requiredApplicantFields as $field) {
        if (!isset($applicantResult[$field]) || trim($applicantResult[$field]) === '') {
            $friendlyName = isset($fieldNames[$field]) ? $fieldNames[$field] : $field;
            echo json_encode([
                'success' => true,
                'isComplete js_personal_info' => false,
                'message' => "$friendlyName is missing or incomplete. Please ensure your profile is fully updated."
            ]);
            exit;
        }
    }
    

    $personalInfoQuery = "SELECT * FROM js_personal_info WHERE applicant_id = :applicant_id";
    $personalStmt = $conn->prepare($personalInfoQuery);
    $personalStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $personalStmt->execute();
    $personalResult = $personalStmt->fetch(PDO::FETCH_ASSOC);

    if (!$personalResult) {
        echo json_encode(['success' => true, 'isComplete js_personal_info' => false, 'message' => 'No data returned from js_personal_info']);
        exit;
    }

    $requiredPersonalFields = [
        'address', 'city', 'headline', 'birthday', 'birthplace', 
        'barangay', 'postal', 'status', 'experience', 
        'attainment', 'biography', 'nationality'
    ];
    $fieldNames = [
        'address' => 'Address',
        'city' => 'City',
        'headline' => 'Headline',
        'birthday' => 'Birthday',
        'birthplace' => 'Birthplace',
        'barangay' => 'Barangay',
        'postal' => 'Postal Code',
        'status' => 'Status',
        'experience' => 'Experience',
        'attainment' => 'Attainment',
        'biography' => 'Biography',
        'nationality' => 'Nationality'
    ];
    foreach ($requiredPersonalFields as $field) {
        if (!isset($personalResult[$field]) || trim($personalResult[$field]) === '') {
            $friendlyName = isset($fieldNames[$field]) ? $fieldNames[$field] : $field;
            echo json_encode([
                'success' => true,
                'isComplete js_personal_info' => false,
                'message' => "$friendlyName is missing or incomplete. Please ensure your profile is fully updated."
            ]);
            exit;
        }
    }
    $socialMediaQuery = "SELECT COUNT(*) AS count FROM js_applicant_socialmedia WHERE applicant_id = :applicant_id";
    $socialMediaStmt = $conn->prepare($socialMediaQuery);
    $socialMediaStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $socialMediaStmt->execute();
    $socialMediaCount = $socialMediaStmt->fetch(PDO::FETCH_ASSOC)['count'];

    if ($socialMediaCount < 1) {
        echo json_encode(['success' => true, 'isComplete js_applicant_socialmedia' => false, 'message' => 'Please add at least one social media link to complete your profile.']);
        exit;
    }

    $resumeQuery = "SELECT COUNT(*) AS count FROM js_applicant_resume WHERE applicant_id = :applicant_id";
    $resumeStmt = $conn->prepare($resumeQuery);
    $resumeStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $resumeStmt->execute();
    $resumeCount = $resumeStmt->fetch(PDO::FETCH_ASSOC)['count'];

    if ($resumeCount < 1) {
        echo json_encode(['success' => true, 'isComplete js_applicant_resume' => false, 'message' => 'Please upload at least one resume to complete your profile.']);
        exit;
    }

    echo json_encode(['success' => true, 'isCompleteSocialMedia' => true, 'isCompleteResume' => true, 'message' => 'Profile is complete']);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
