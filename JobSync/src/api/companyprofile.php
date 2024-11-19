<?php
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['companyName']) && isset($_POST['aboutUs']) && isset($_POST['employer_id'])) {
        $companyName = $_POST['companyName'];
        $aboutUs = $_POST['aboutUs'];
        $employerId = $_POST['employer_id'];
        
        $logoPath = null;
        $bannerPath = null;

        // If logo is uploaded
        if (isset($_FILES['logo']) && $_FILES['logo']['error'] === UPLOAD_ERR_OK) {
            $logo = $_FILES['logo'];
            $uploadDir = 'uploads/';
            $logoExtension = pathinfo($logo['name'], PATHINFO_EXTENSION);
            $logoPath = $uploadDir . uniqid('logo_', true) . '.' . $logoExtension;
            if (!move_uploaded_file($logo['tmp_name'], $logoPath)) {
                die(json_encode(["error" => "Error uploading logo."]));
            }
        }

        if (isset($_FILES['banner']) && $_FILES['banner']['error'] === UPLOAD_ERR_OK) {
            $banner = $_FILES['banner'];
            $uploadDir = 'uploads/';
            $bannerExtension = pathinfo($banner['name'], PATHINFO_EXTENSION);
            $bannerPath = $uploadDir . uniqid('banner_', true) . '.' . $bannerExtension;
            if (!move_uploaded_file($banner['tmp_name'], $bannerPath)) {
                die(json_encode(["error" => "Error uploading banner."]));
            }
        }

        try {
            // Check if company record exists for the employer_id
            $checkSql = "SELECT * FROM js_company_info WHERE employer_id = :employer_id";
            $checkStmt = $conn->prepare($checkSql);
            $checkStmt->bindParam(':employer_id', $employerId);
            $checkStmt->execute();

            if ($checkStmt->rowCount() > 0) {
                // Record exists, so update the company info
                $updateSql = "UPDATE js_company_info SET company_name = :companyName, about_us = :aboutUs";
                
                // Only update logo if it's uploaded
                if ($logoPath) {
                    $updateSql .= ", logo = :logo";
                }
                
                // Only update banner if it's uploaded
                if ($bannerPath) {
                    $updateSql .= ", banner = :banner";
                }

                $updateSql .= " WHERE employer_id = :employer_id";
                $updateStmt = $conn->prepare($updateSql);

                $updateStmt->bindParam(':companyName', $companyName);
                $updateStmt->bindParam(':aboutUs', $aboutUs);

                if ($logoPath) {
                    $updateStmt->bindParam(':logo', $logoPath);
                }

                if ($bannerPath) {
                    $updateStmt->bindParam(':banner', $bannerPath);
                }

                $updateStmt->bindParam(':employer_id', $employerId);

                if ($updateStmt->execute()) {
                    echo json_encode(["message" => "Record updated successfully."]);
                } else {
                    echo json_encode(["error" => "Error executing update query."]);
                }
            } else {
                // Record does not exist, insert a new record
                $insertSql = "INSERT INTO js_company_info (employer_id, company_name, about_us, logo, banner) VALUES (:employer_id, :companyName, :aboutUs, :logo, :banner)";
                $insertStmt = $conn->prepare($insertSql);

                $insertStmt->bindParam(':employer_id', $employerId);
                $insertStmt->bindParam(':companyName', $companyName);
                $insertStmt->bindParam(':aboutUs', $aboutUs);

                // If logo is uploaded, include it in the insert query
                if ($logoPath) {
                    $insertStmt->bindParam(':logo', $logoPath);
                } else {
                    $insertStmt->bindValue(':logo', null, PDO::PARAM_NULL);  // Set logo as null if not uploaded
                }

                // If banner is uploaded, include it in the insert query
                if ($bannerPath) {
                    $insertStmt->bindParam(':banner', $bannerPath);
                } else {
                    $insertStmt->bindValue(':banner', null, PDO::PARAM_NULL);  // Set banner as null if not uploaded
                }

                if ($insertStmt->execute()) {
                    echo json_encode(["message" => "Record saved successfully."]);
                } else {
                    echo json_encode(["error" => "Error executing insert query."]);
                }
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
