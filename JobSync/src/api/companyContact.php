<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);
$employer_id = $data['employer_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $employer_id) {
    $contact_number = $data['contactNumber'] ?? '';
    $email_address = $data['emailAddress'] ?? '';
    $location = $data['location'] ?? '';

    $stmt = $conn->prepare("UPDATE js_company_contact SET contact_number = :contact_number, company_email = :email_address, address = :location WHERE employer_id = :employer_id");

    $stmt->bindParam(':contact_number', $contact_number);
    $stmt->bindParam(':email_address', $email_address);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':employer_id', $employer_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Data updated successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update data"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Employer ID not provided or invalid request method"]);
}
