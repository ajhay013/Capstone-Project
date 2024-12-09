<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $applicant_id = $_GET['applicant_id'] ?? null;

    if ($applicant_id) {
        try {
            $stmt = $conn->prepare("SELECT job_id FROM js_favorite_jobs WHERE applicant_id = :applicant_id");
            $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
            $stmt->execute();

            $bookmarkedJobs = $stmt->fetchAll(PDO::FETCH_COLUMN);

            echo json_encode(['success' => true, 'bookmarkedJobs' => $bookmarkedJobs]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid applicant ID.']);
    }
}
?>
