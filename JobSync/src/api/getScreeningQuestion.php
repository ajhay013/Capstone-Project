<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);
$job_id = $data['job_id'] ?? null;

if ($job_id) {
    // Query to fetch all screening questions for the provided job_id
    $stmt = $conn->prepare('SELECT * FROM js_screening_question WHERE job_id = :job_id');
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

    try {
        $stmt->execute();
        $screeningQuestions = $stmt->fetchAll(PDO::FETCH_ASSOC); 

        if ($screeningQuestions) {
            echo json_encode($screeningQuestions); 
        } else {
            echo json_encode(['error' => 'No screening questions found for this job']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Job ID is missing']);
}
?>
