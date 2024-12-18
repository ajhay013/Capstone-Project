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
    $job_id = $_GET['job_id'] ?? null;

    if ($applicant_id) {
        try {
            $stmt = $conn->prepare("SELECT * FROM js_applicant_application_resume WHERE applicant_id = :applicant_id AND job_id = :job_id");
            $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
            $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
            $stmt->execute();

            $apply = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['success' => true, 'apply' => $apply]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid applicant ID.']);
    }
}
?>
