<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data from POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $applicant_id = $data['applicant_id'] ?? null;
    $job_id = $data['job_id'] ?? null;

    // Validate input
    if (!$applicant_id || !$job_id) {
        echo json_encode(['success' => false, 'message' => 'Invalid applicant or job ID.']);
        exit;
    }

    try {
        // Prepare the DELETE SQL query
        $sql = "DELETE FROM js_favorite_jobs WHERE applicant_id = :applicant_id AND job_id = :job_id";
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
        $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Job successfully removed from favorites.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to remove the job from favorites.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
