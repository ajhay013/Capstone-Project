<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $input = json_decode(file_get_contents('php://input'), true);
    $application_id = $input['application_id'] ?? null;
    $job_id = $input['job_id'] ?? null;

    if (!$application_id || !$job_id) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid input: Both application_id and job_id are required.',
        ]);
        exit;
    }
    $sql = "SELECT * FROM applicant_answer 
            WHERE job_id = :job_id AND application_id = :application_id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

    $stmt->execute();
    $answer = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "answer" => $answer
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage(),
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred: ' . $e->getMessage(),
    ]);
}
