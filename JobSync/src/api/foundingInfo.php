<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['employer_id'], $data['organizationType'], $data['industryType'], $data['teamSize'], $data['yearOfEstablishment'], $data['companyWebsite'], $data['companyVision'])) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

$employer_id = intval($data['employer_id']);
$organizationType = htmlspecialchars($data['organizationType'], ENT_QUOTES, 'UTF-8');
$industryType = htmlspecialchars($data['industryType'], ENT_QUOTES, 'UTF-8');
$teamSize = htmlspecialchars($data['teamSize'], ENT_QUOTES, 'UTF-8');
$yearOfEstablishment = intval($data['yearOfEstablishment']);
$companyWebsite = filter_var($data['companyWebsite'], FILTER_SANITIZE_URL);
$companyVision = htmlspecialchars($data['companyVision'], ENT_QUOTES, 'UTF-8');

try {
    $sql = "INSERT INTO js_founding_info (employer_id, organization, industry, team_size, year_establishment, company_website, company_vision)
            VALUES (:employer_id, :organizationType, :industryType, :teamSize, :yearOfEstablishment, :companyWebsite, :companyVision)";
    
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $stmt->bindParam(':organizationType', $organizationType, PDO::PARAM_STR);
    $stmt->bindParam(':industryType', $industryType, PDO::PARAM_STR);
    $stmt->bindParam(':teamSize', $teamSize, PDO::PARAM_STR);
    $stmt->bindParam(':yearOfEstablishment', $yearOfEstablishment, PDO::PARAM_INT);
    $stmt->bindParam(':companyWebsite', $companyWebsite, PDO::PARAM_STR);
    $stmt->bindParam(':companyVision', $companyVision, PDO::PARAM_STR);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Data saved successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to save data"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
}

$conn = null;
?>
