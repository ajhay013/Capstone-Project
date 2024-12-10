<?php
include 'dbconnect.php';
include 'config.php';

header('Content-Type: application/json');

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()])); 
}

$applicant_id = $_GET['applicant_id'] ?? null;
if ($applicant_id) {
    $query = "SELECT * FROM applicants_favorite_jobs WHERE applicant_id = :applicant_id ORDER BY added_at DESC";
    try {
        $stmt = $conn->prepare($query); 
        $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
        $stmt->execute();
        $favoriteJobs = $stmt->fetchAll(PDO::FETCH_ASSOC); 
        foreach ($favoriteJobs as &$favoriteJob) {
            if (isset($favoriteJob['logo']) && !empty($favoriteJob['logo'])) {
                $favoriteJob['logo'] = BASE_URL . $favoriteJob['logo'];  
            }
        }
        echo json_encode($favoriteJobs);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Failed to fetch favorite jobs: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Applicant ID is required']);
}
?>
