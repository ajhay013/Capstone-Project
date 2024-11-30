<?php
include 'dbconnect.php';

header('Content-Type: application/json');

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['employer_id']) || !isset($data['socialLinks'])) {
    die(json_encode(['error' => 'Invalid input: employer_id or socialLinks missing']));
}

$employer_id = $data['employer_id'];
$socialLinks = $data['socialLinks'];

$checkStmt = $conn->prepare("SELECT COUNT(*) FROM js_social_media_company WHERE employer_id = :employer_id");
$checkStmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
$checkStmt->execute();
$exists = $checkStmt->fetchColumn() > 0;

if (!$exists) {
    $insertStmt = $conn->prepare("INSERT INTO js_social_media_company (employer_id, created_at) VALUES (:employer_id, NOW())");
    $insertStmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $insertStmt->execute();
}

$fetchColumnsStmt = $conn->prepare("
    SELECT column_name 
    FROM information_schema.columns 
    WHERE table_name = 'js_social_media_company'
    AND column_name LIKE '%_icon'
");
$fetchColumnsStmt->execute();
$allColumns = $fetchColumnsStmt->fetchAll(PDO::FETCH_COLUMN);

$updatedColumns = [];
foreach ($socialLinks as $socialLink) {
    if (isset($socialLink['platform']) && isset($socialLink['link'])) {
        $platform = strtolower(str_replace(' ', '_', $socialLink['platform']));
        $columnName = $platform . '_icon';
        $updatedColumns[$columnName] = $socialLink['link'];
    }
}

foreach ($allColumns as $column) {
    $link = $updatedColumns[$column] ?? null; 

    $updateStmt = $conn->prepare("
        UPDATE js_social_media_company
        SET $column = :link, created_at = NOW()
        WHERE employer_id = :employer_id
    ");
    $updateStmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
    $updateStmt->bindValue(':link', $link, $link ? PDO::PARAM_STR : PDO::PARAM_NULL);
    $updateStmt->execute();
}

echo json_encode(['status' => 'success']);
?>
