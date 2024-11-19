<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['job_id']) || !isset($data['expirationDate'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

$job_id = $data['job_id'];
$expirationDate = $data['expirationDate'];
$currentDate = date('Y-m-d H:i:s');  

try {
    $stmt = $conn->prepare("UPDATE js_post_jobs SET expirationDate = :expirationDate, created_at = :created_at WHERE job_id = :job_id");
    $stmt->bindParam(':expirationDate', $expirationDate);
    $stmt->bindParam(':created_at', $currentDate); 
    $stmt->bindParam(':job_id', $job_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Expiration date and created_at updated"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed"]);
    }
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}

$conn = null;
?>
