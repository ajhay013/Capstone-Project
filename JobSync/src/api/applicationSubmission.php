<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));  
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get posted data
    $applicant_id = $_POST['applicant_id'];
    $job_id = $_POST['job_id'];
    $resumeName = $_POST['resume_name'];
    $coverLetter = $_POST['coverLetter'];
    $resumePath = $_POST['resume'];
    
    $checkQuery = "SELECT COUNT(*) FROM js_applicant_application_resume WHERE applicant_id = :applicant_id AND job_id = :job_id";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $checkStmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $checkStmt->execute();
    $existingApplication = $checkStmt->fetchColumn();

    if ($existingApplication > 0) {
        echo json_encode(['error' => true, 'message' => 'You have already submitted an application for this position.']);
        exit;
    }

    try {
        $resumeQuery = "INSERT INTO js_applicant_application_resume (applicant_id, job_id, resumeName, resumePath, coverLetter, applied_status) 
                        VALUES (:applicant_id, :job_id, :resumeName, :resumePath, :coverLetter, 'Pending')";
        $resumeStmt = $conn->prepare($resumeQuery);
        $resumeStmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
        $resumeStmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
        $resumeStmt->bindParam(':resumeName', $resumeName, PDO::PARAM_STR);
        $resumeStmt->bindParam(':resumePath', $resumePath, PDO::PARAM_STR);
        $resumeStmt->bindParam(':coverLetter', $coverLetter, PDO::PARAM_STR);
        $resumeStmt->execute();

        $application_id = $conn->lastInsertId();

        foreach ($_POST as $key => $value) {
            if (strpos($key, 'screening_answer_') === 0) {
                $question_id = str_replace('screening_answer_', '', $key);
                $answer = $value;

                $answerQuery = "INSERT INTO js_applicant_application (application_id, question_id, answer) 
                                VALUES (:application_id, :question_id, :answer)";
                $answerStmt = $conn->prepare($answerQuery);
                $answerStmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
                $answerStmt->bindParam(':question_id', $question_id, PDO::PARAM_INT);
                $answerStmt->bindParam(':answer', $answer, PDO::PARAM_STR);
                $answerStmt->execute();
            }
        }

        $notifQuery = "INSERT INTO js_notification (application_id) VALUES (:application_id)";
        $notifStmt = $conn->prepare($notifQuery);
        $notifStmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
        $notifStmt->execute();

        echo json_encode(['success' => true, 'message' => 'Your application has been successfully submitted.']);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Database error: " . $e->getMessage()]);
    }

} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
