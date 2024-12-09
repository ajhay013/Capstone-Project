<?php 
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['applicant_id'], $data['biography'], $data['city'], $data['address'], $data['barangay'], $data['postal'])) {
        $applicant_id = $data['applicant_id'];
        $biography = $data['biography'];
        $city = $data['city'];
        $address = $data['address'];
        $barangay = $data['barangay'];
        $postal = $data['postal'];

        $sql = "UPDATE js_personal_info 
                SET biography = :biography, 
                    city = :city, 
                    address = :address, 
                    barangay = :barangay, 
                    postal = :postal 
                WHERE applicant_id = :applicant_id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':biography', $biography);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':barangay', $barangay);
        $stmt->bindParam(':postal', $postal);
        $stmt->bindParam(':applicant_id', $applicant_id, PDO::PARAM_INT);

        try {
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Information updated successfully.']);
            } else {
                $errorInfo = $stmt->errorInfo(); 
                echo json_encode(['success' => false, 'message' => 'Failed to update information.', 'error' => $errorInfo[2]]);
            }
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
        
    } else {
        // Missing required fields
        echo json_encode(['success' => false, 'message' => 'Invalid input. Please provide all required fields.']);
    }
} else {
    // Handle invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
