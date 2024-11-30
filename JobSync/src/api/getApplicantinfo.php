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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $applicant_id = $data['applicant_id'] ?? null;

    if ($applicant_id) {
        try {
            $stmt = $conn->prepare("SELECT profile_picture FROM js_applicants WHERE applicant_id = :applicant_id");
            $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);
            
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $profile_picture = $row['profile_picture'];
                
                if ($profile_picture && (strpos($profile_picture, 'http://') === 0 || strpos($profile_picture, 'https://') === 0)) {
                    $profile_picture_url = $profile_picture;
                } else {
                    $profile_picture_url = $profile_picture ? BASE_URL . $profile_picture : null;
                }

                echo json_encode(['profile' => $profile_picture_url]);
            } else {
                echo json_encode(['profile' => null]);
            }
        } catch (PDOException $e) {
            echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Invalid applicant_id.']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
