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
$applicant_id = $data['applicant_id'] ?? null;

if (!$applicant_id) {
    echo json_encode(['error' => 'Applicant ID is required']);
    exit;
}

try {
    $stmt = $conn->prepare('SELECT * FROM applied_jobs WHERE applicant_id = :applicant_id ORDER BY applied_at DESC');
    $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($result as &$results) {
        if (isset($results['logo']) && !empty($results['logo'])) {
            $results['logo'] = BASE_URL . $results['logo'];  
        }
    }
    echo json_encode($result); 
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch applied jobs: ' . $e->getMessage()]);
}
?>
