<?php
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['logo']) && isset($_FILES['banner']) && isset($_POST['companyName']) && isset($_POST['aboutUs']) && isset($_POST['employer_id'])) {
        $companyName = $_POST['companyName'];
        $aboutUs = $_POST['aboutUs'];
        $employerId = $_POST['employer_id'];
        $logo = $_FILES['logo'];
        $banner = $_FILES['banner'];
        
        $uploadDir = 'uploads/'; 
        
        $logoPath = $uploadDir . basename($logo['name']);
        if (!move_uploaded_file($logo['tmp_name'], $logoPath)) {
            die(json_encode(["error" => "Error uploading logo."]));
        }

        $bannerPath = $uploadDir . basename($banner['name']);
        if (!move_uploaded_file($banner['tmp_name'], $bannerPath)) {
            die(json_encode(["error" => "Error uploading banner."]));
        }

        try {
            $sql = "INSERT INTO js_company_info (employer_id, company_name, about_us, logo, banner) VALUES (:employer_id, :companyName, :aboutUs, :logo, :banner)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':employer_id', $employerId);
            $stmt->bindParam(':companyName', $companyName);
            $stmt->bindParam(':aboutUs', $aboutUs);
            $stmt->bindParam(':logo', $logoPath);
            $stmt->bindParam(':banner', $bannerPath);
            
            if ($stmt->execute()) {
                echo json_encode(["message" => "Record saved successfully."]);
            } else {
                echo json_encode(["error" => "Error executing query."]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => "Database error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "Required fields are missing."]);
    }
} else {
    echo json_encode(["error" => "Invalid request method."]);
}

$conn = null;
?>
