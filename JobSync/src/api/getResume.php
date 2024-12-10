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
    $stmt = $conn->prepare('SELECT resumePath, resumeName FROM js_applicant_resume WHERE applicant_id = :applicant_id');
    $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
    $stmt->execute();

    $resumes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($resumes) {
        foreach ($resumes as &$resume) {
            $resume['url'] = BASE_URL . $resume['resumePath'];
        }

        echo json_encode($resumes);
    } else {
        echo json_encode(['error' => 'No resumes found']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch resumes: ' . $e->getMessage()]);
}
?>
