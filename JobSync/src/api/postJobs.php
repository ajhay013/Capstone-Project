<?php 
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

try {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $conn->prepare("INSERT INTO js_post_jobs (employer_id, jobTitle, jobTags, jobRole, 
        minSalary, maxSalary, salaryType, education, experience, jobType, expirationDate, 
        jobLevel, address, city, selectedBenefits, jobDescription, status
    ) VALUES (
        :employer_id, :jobTitle, :jobTags, :jobRole, :minSalary, 
        :maxSalary, :salaryType, :education, :experience, :jobType, :expirationDate, 
        :jobLevel, :address, :city, :selectedBenefits, :jobDescription, 'Active'
    )");

    $selectedBenefits = json_encode($data['selectedBenefits']);

    $stmt->bindParam(':employer_id', $data['employer_id']);
    $stmt->bindParam(':jobTitle', $data['jobTitle']);
    $stmt->bindParam(':jobTags', $data['jobTags']);
    $stmt->bindParam(':jobRole', $data['jobRole']);
    $stmt->bindParam(':minSalary', $data['minSalary']);
    $stmt->bindParam(':maxSalary', $data['maxSalary']);
    $stmt->bindParam(':salaryType', $data['salaryType']);
    $stmt->bindParam(':education', $data['education']);
    $stmt->bindParam(':experience', $data['experience']);
    $stmt->bindParam(':jobType', $data['jobType']);
    $stmt->bindParam(':expirationDate', $data['expirationDate']);
    $stmt->bindParam(':jobLevel', $data['jobLevel']);
    $stmt->bindParam(':address', $data['address']);
    $stmt->bindParam(':city', $data['city']);
    $stmt->bindParam(':selectedBenefits', $selectedBenefits);
    $stmt->bindParam(':jobDescription', $data['jobDescription']);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Job posted successfully"]);
    } else {
        echo json_encode(["message" => "Failed to post job"]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
}
?>
