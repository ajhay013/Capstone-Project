<?php
include 'dbconnect.php';
include 'config.php'; 

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()])); 
}

$sql = "SELECT * FROM complete_company_profile";

try {
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $companies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($companies as &$company) {
        if (!empty($company['logo'])) {
            $company['logo'] = BASE_URL . $company['logo'];
        }

        if (!empty($company['banner'])) {
            $company['banner'] = BASE_URL . $company['banner'];
        }
    }

    if ($companies) {
        echo json_encode($companies);
    } else {
        echo json_encode([]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error fetching data: ' . $e->getMessage()]);
}

$conn = null;
?>
