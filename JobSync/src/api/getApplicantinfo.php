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
            $stmt = $conn->prepare("SELECT * FROM applicant_details WHERE applicant_id = :applicant_id");
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

                echo json_encode([
                    'profile' => $profile_picture_url,
                    'firstname' => $row['firstname'] ?? null,
                    'middlename' => $row['middlename'] ?? null,
                    'lastname' => $row['lastname'] ?? null,
                    'suffix' => $row['suffix'] ?? null,
                    'biography' => $row['biography'] ?? null,
                    'experience' => $row['experience'] ?? null,
                    'education' => $row['attainment'] ?? null,
                    'gender' => $row['gender'] ?? null,
                    'marital_status' => $row['status'] ?? null,
                    'contact' => $row['contact'] ?? null,
                    'headline' => $row['headline'] ?? null,
                    'birthday' => $row['birthday'] ?? null,
                    'birthplace' => $row['birthplace'] ?? null,
                    'address' => $row['address'] ?? null,
                    'city' => $row['city'] ?? null,
                    'barangay' => $row['barangay'] ?? null,
                    'email' => $row['email'] ?? null,
                    'postal' => $row['postal'] ?? null,
                    'nationality' => $row['nationality'] ?? null,
                ]);
            } else {
                echo json_encode(['error' => 'No record found for this applicant.']);
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
