<?php
include 'dbconnect.php';
include 'config.php'; 

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()])); 
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['employerId'])) {
    $employerId = urldecode($_GET['employerId']);  
    try {
        $sql = "SELECT * FROM complete_company_profile WHERE company_name = :employerId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':employerId', $employerId, PDO::PARAM_STR); 
        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            if (!empty($data['logo'])) {
                $data['logo'] = BASE_URL . $data['logo'];
            }

            if (!empty($data['banner'])) {
                $data['banner'] = BASE_URL . $data['banner'];
            }

            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Company profile not found.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'Database query failed: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request.']);
}

$conn = null;
?>
