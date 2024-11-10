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

if ($employer_id) {
    try {
        $query = "SELECT total_jobs FROM employer_job_count WHERE employer_id = :employer_id";
        $stmt = $conn->prepare($query); 
        
        $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            echo json_encode(['jobs' => $result]); 
        } else {
            echo json_encode(['error' => 'No jobs found for this employer.']);
        }

    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error fetching jobs: ' . $e->getMessage()]);
    }

} else {
    echo json_encode(['error' => 'Employer ID is missing.']);
}
?>
