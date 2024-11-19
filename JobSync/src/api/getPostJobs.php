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

if ($employer_id === null) {
    echo json_encode(['error' => 'Employer ID is required']);
    exit;
}

try {
    $updateStmt = $conn->prepare("
        UPDATE js_post_jobs
        SET status = 'Expired', expirationDate = IF(expirationDate < NOW(), expirationDate, NOW())
        WHERE employer_id = :employer_id AND expirationDate < NOW()
    ");
    $updateStmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $updateStmt->execute();

    $stmt = $conn->prepare("
        SELECT *,
        GREATEST(DATEDIFF(expirationDate, NOW()), 0) AS remainingDays
        FROM js_post_jobs 
        WHERE employer_id = :employer_id
        ORDER BY 
            CASE
                WHEN status = 'Expired' THEN 1
                ELSE 0
            END,
            expirationDate ASC, created_at DESC
    ");
    $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $stmt->execute();

    $jobsInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($jobsInfo) {
        echo json_encode(['jobs' => $jobsInfo]);
    } else {
        echo json_encode(['error' => 'No jobs found for the given employer ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
}

$conn = null;

?>
