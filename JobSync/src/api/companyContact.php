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
    $city = $data['city'] ?? ''; 

    $stmt = $conn->prepare("SELECT employer_id FROM js_company_contact WHERE employer_id = :employer_id");
    $stmt->bindParam(':employer_id', $employer_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $stmt = $conn->prepare("UPDATE js_company_contact SET contact_number = :contact_number, company_email = :email_address, address = :location, city = :city WHERE employer_id = :employer_id");

        $stmt->bindParam(':contact_number', $contact_number);
        $stmt->bindParam(':email_address', $email_address);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':city', $city);
        $stmt->bindParam(':employer_id', $employer_id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Data updated successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update data"]);
        }
    } else {
        $stmt = $conn->prepare("INSERT INTO js_company_contact (employer_id, contact_number, company_email, address, city) VALUES (:employer_id, :contact_number, :email_address, :location, :city)");

        $stmt->bindParam(':employer_id', $employer_id);
        $stmt->bindParam(':contact_number', $contact_number);
        $stmt->bindParam(':email_address', $email_address);
        $stmt->bindParam(':location', $location);
        $stmt->bindParam(':city', $city);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Data inserted successfully"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to insert data"]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Employer ID not provided or invalid request method"]);
}
