<?php
include 'dbconnect.php';

header('Content-Type: application/json');

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $input = json_decode(file_get_contents('php://input'), true);
    $applicant_id = $input['applicant_id'] ?? null;
    $job_id = $input['job_id'] ?? null;

    if (!$job_id) {
        echo json_encode(['error' => 'Missing job_id parameter']);
        exit;
    }

    $query = "SELECT * FROM view_applications WHERE job_id = :job_id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    $stmt->execute();

    $applications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($applications) {
        echo json_encode(['jobs' => $applications]);
    } else {
        echo json_encode(['jobs' => []]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}
?>
