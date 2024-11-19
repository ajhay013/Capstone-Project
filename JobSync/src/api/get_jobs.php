<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 

    $job_id = isset($_GET['job_id']) ? $_GET['job_id'] : null;
    
    $sql = "SELECT * FROM active_job_postings";
    
    if ($job_id) {
        $sql .= " WHERE job_id = :job_id";
    }

    $stmt = $conn->prepare($sql);

    if ($job_id) {
        $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
    }

    $stmt->execute();

    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($jobs as &$job) {
        if (isset($job['logo']) && !empty($job['logo'])) {
            $job['logo'] = BASE_URL . $job['logo'];
        }
    }

    echo json_encode($jobs); 

} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
} finally {
    $conn = null;
}
?>
