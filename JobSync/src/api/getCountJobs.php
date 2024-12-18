<?php
include 'dbconnect.php';
include 'config.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $input = json_decode(file_get_contents('php://input'), true);
    $employer_id = $input['employer_id'] ?? null;

    if (!$employer_id) {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid input: employer_id are required.',
        ]);
        exit;
    }
    $sql = "SELECT prof.job_post_count FROM complete_company_profile prof
            JOIN js_company_info emp ON prof.company_name = emp.company_name
            WHERE emp.employer_id = :employer_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);

    $stmt->execute();
    $counts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([ "counts" => $counts ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage(),
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => 'An error occurred: ' . $e->getMessage(),
    ]);
}
