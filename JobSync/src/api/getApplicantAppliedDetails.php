<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $input = json_decode(file_get_contents('php://input'), true);
    $application_id = $input['application_id'] ?? null;
    $job_id = $input['job_id'] ?? null;

    if (!$application_id || !$job_id) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid input: Both application_id and job_id are required.',
        ]);
        exit;
    }

    $sql = "SELECT a.*, res.applied_status FROM applicant_applied_details a 
            JOIN js_applicant_application_resume res ON a.application_id = res.application_id
            WHERE a.job_id = :job_id AND a.application_id = :application_id";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':application_id', $application_id, PDO::PARAM_INT);
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

    $stmt->execute();

    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($jobs) {
        foreach ($jobs as &$job) {
            $profile_picture = $job['profile_picture'];

            if ($profile_picture && (strpos($profile_picture, 'http://') === 0 || strpos($profile_picture, 'https://') === 0)) {
                $profile_picture_url = $profile_picture;
            } else {
                $profile_picture_url = $profile_picture ? BASE_URL . $profile_picture : null;
            }
            $job['profile_picture_url'] = $profile_picture_url;
        }

        echo json_encode([
            'jobs' => $jobs,
            'profile_picture_url' => $profile_picture_url
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No jobs found for the provided application_id and job_id.',
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage(),
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred: ' . $e->getMessage(),
    ]);
}
