<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $applicant_id = $data['applicant_id'] ?? null;
    $job_id = $data['job_id'] ?? null;
    try {
        $stmt = $conn->prepare("INSERT INTO js_favorite_jobs (applicant_id, job_id) VALUES (:applicant_id, :job_id)");
        $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
        $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Job added to favorites.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add job to favorites.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}
?>
