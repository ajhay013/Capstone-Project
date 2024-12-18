<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 

    $job_id = isset($_GET['job_id']) ? $_GET['job_id'] : null;
    $applicant_id = isset($_GET['applicant_id']) ? $_GET['applicant_id'] : null;
    
    $sql = "SELECT a.*, res.applied_status, c.logo FROM js_post_jobs a
            JOIN js_applicant_application_resume res ON a.job_id = res.job_id
            JOIN js_company_info c ON a.employer_id = c.employer_id";
    
    if ($job_id) {
        $sql .= " WHERE a.job_id = :job_id AND applicant_id = :applicant_id";
    }

    $stmt = $conn->prepare($sql);

    if ($job_id) {
        $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);
        $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
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
