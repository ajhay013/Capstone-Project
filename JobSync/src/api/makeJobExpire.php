<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);
$employer_id = $data['employer_id'] ?? null;
$job_id = $data['job_id'] ?? null;

if ($employer_id === null || $job_id === null) {
    echo json_encode(['error' => 'Employer ID and Job ID are required']);
    exit;
}

try {
    $updateStmt = $conn->prepare("
        UPDATE js_post_jobs
        SET expirationDate = NOW(), status = 'Expired'
        WHERE employer_id = :employer_id AND job_id = :job_id AND status != 'Expired'
    ");
    $updateStmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $updateStmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $updateStmt->execute();

    if ($updateStmt->rowCount() > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Job update failed or job already expired']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
}

$conn = null;
?>
