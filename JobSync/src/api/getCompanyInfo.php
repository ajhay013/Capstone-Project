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
$employer_id = $data['employer_id'] ?? null;

if ($employer_id === null) {
    echo json_encode(['error' => 'Employer ID is required']);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM js_company_info WHERE employer_id = :employer_id");
    $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $companyInfo = $stmt->fetch(PDO::FETCH_ASSOC);

        $companyInfo['logo'] = BASE_URL . $companyInfo['logo'];
        $companyInfo['banner'] = BASE_URL . $companyInfo['banner'];

        echo json_encode($companyInfo);
    } else {
        echo json_encode(['error' => 'No company information found for the given employer ID']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
}

$conn = null;
?>
