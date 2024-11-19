<?php
include 'dbconnect.php';

header('Content-Type: application/json');

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$employer_id = $_GET['employer_id'] ?? null;

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $employer_id) {
    try {
        $stmt = $conn->prepare("SELECT social_media, media_link FROM js_social_media_company WHERE employer_id = :employer_id");
        $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
        $stmt->execute();
        $socialLinks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['socialLinks' => $socialLinks]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method or missing employer_id']);
}
?>
