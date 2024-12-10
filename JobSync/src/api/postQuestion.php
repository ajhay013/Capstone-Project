<?php
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

try {
    $questions = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO js_screening_question (job_id, question, answerType, idealAnswer, mustHave, additionalInfo) 
                            VALUES (:job_id, :question, :answerType, :idealAnswer, :mustHave, :additionalInfo)");

    foreach ($questions as $question) {
        $stmt->bindParam(':job_id', $question['job_id']);
        $stmt->bindParam(':question', $question['question']);
        $stmt->bindParam(':answerType', $question['answerType']);
        $stmt->bindParam(':idealAnswer', $question['idealAnswer']);
        $stmt->bindParam(':mustHave', $question['mustHave'], PDO::PARAM_BOOL);

        // Check for qualification settings (additionalInfo)
        $additionalInfo = isset($question['additionalInfo']) ? $question['additionalInfo'] : null;
        $stmt->bindParam(':additionalInfo', $additionalInfo, PDO::PARAM_STR);

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Failed to save questions"]);
            exit;
        }
    }

    echo json_encode(["success" => true, "message" => "Questions and qualification settings saved successfully"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
