<?php 
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

try {
    $input = json_decode(file_get_contents("php://input"), true);
    $employerId = $input['employer_id']; 
    $jobData = $input['jobData']['jobData']; 
    $screeningQuestions = $input['screeningQuestions'];
    $qualificationMessage = $input['qualificationMessage'];  

    $conn->beginTransaction();

    $stmt = $conn->prepare("INSERT INTO js_post_jobs (employer_id, jobTitle, jobTags, jobRole, 
        minSalary, maxSalary, salaryType, education, experience, jobType, expirationDate, 
        jobLevel, address, city, selectedBenefits, jobDescription, status
    ) VALUES (
        :employer_id, :jobTitle, :jobTags, :jobRole, :minSalary, 
        :maxSalary, :salaryType, :education, :experience, :jobType, :expirationDate, 
        :jobLevel, :address, :city, :selectedBenefits, :jobDescription, 'Active'
    )");

    $selectedBenefits = isset($jobData['selectedBenefits']) ? implode(',', $jobData['selectedBenefits']) : null;

    $stmt->bindParam(':employer_id', $employerId); 
    $stmt->bindParam(':jobTitle', $jobData['jobTitle']);
    $stmt->bindParam(':jobTags', $jobData['jobTags']);
    $stmt->bindParam(':jobRole', $jobData['jobRole']);
    $stmt->bindParam(':minSalary', $jobData['minSalary']);
    $stmt->bindParam(':maxSalary', $jobData['maxSalary']);
    $stmt->bindParam(':salaryType', $jobData['salaryType']);
    $stmt->bindParam(':education', $jobData['education']);
    $stmt->bindParam(':experience', $jobData['experience']);
    $stmt->bindParam(':jobType', $jobData['jobType']);
    $stmt->bindParam(':expirationDate', $jobData['expirationDate']);
    $stmt->bindParam(':jobLevel', $jobData['jobLevel']);
    $stmt->bindParam(':address', $jobData['address']);
    $stmt->bindParam(':city', $jobData['city']);
    $stmt->bindParam(':selectedBenefits', $selectedBenefits);
    $stmt->bindParam(':jobDescription', $jobData['jobDescription']);

    if (!$stmt->execute()) {
        throw new Exception("Failed to post job");
    }

    $jobId = $conn->lastInsertId();

    $stmt = $conn->prepare("INSERT INTO js_screening_question (job_id, question, response_type, ideal_answer, mustHave, qualification_setting) 
    VALUES (:job_id, :question, :answerType, :idealAnswer, :mustHave, :qualificationMessage)");

        foreach ($screeningQuestions as $question) {

        $stmt->bindParam(':job_id', $jobId);
        $stmt->bindParam(':question', $question['question']);
        $stmt->bindParam(':answerType', $question['answerType']);
        $stmt->bindParam(':idealAnswer', $question['idealAnswer']);
        $stmt->bindParam(':mustHave', $question['mustHave']);

        $qualificationMessageToInsert = $question['mustHave'] ? $qualificationMessage : null;
        $stmt->bindParam(':qualificationMessage', $qualificationMessageToInsert);

        if (!$stmt->execute()) {
        throw new Exception("Failed to insert screening question");
        }
    }       
    $conn->commit();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    $conn->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}
?>
