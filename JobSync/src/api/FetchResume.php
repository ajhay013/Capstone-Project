<?php
include 'dbconnect.php';

$objDb = new Dbconnect();
$pdo = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $applicant_id = $_GET['applicant_id'] ?? null;
    
    if ($applicant_id) {
        try {
            $stmt = $pdo->prepare('SELECT resume_id, resumeName, resumePath FROM js_applicant_resume WHERE applicant_id = :applicant_id');
            $stmt->execute([':applicant_id' => $applicant_id]);
            $resumes = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($resumes) {
                echo json_encode(['success' => true, 'data' => $resumes]); // Return all resumes
            } else {
                echo json_encode(['success' => false, 'message' => 'No resumes found.']);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Applicant ID is required.']);
    }
}
?>
