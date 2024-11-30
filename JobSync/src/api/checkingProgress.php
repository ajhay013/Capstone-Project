<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect(); 
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()])); 
}

$data = json_decode(file_get_contents('php://input'), true);
$employer_id = $_GET['employer_id'] ?? null;

if ($employer_id === null) {
    echo json_encode(['error' => 'Employer ID is required']);
    exit;
}

$response = [
    'companyInfo' => false,
    'foundingInfo' => false,
    'socialMedia' => false,
    'companyContact' => false
];

try {
    $stmt = $conn->prepare("SELECT * FROM js_company_info WHERE employer_id = :employer_id");
    $stmt->execute([':employer_id' => $employer_id]);
    $company_info = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($company_info) {
        $profileIncomplete = false;
        foreach ($company_info as $column_value) {
            if (empty($column_value) || is_null($column_value)) {
                $profileIncomplete = true;
                break; 
            }
        }
        $response['companyInfo'] = !$profileIncomplete; 
    }

    $stmt = $conn->prepare("SELECT * FROM js_founding_info WHERE employer_id = :employer_id");
    $stmt->execute([':employer_id' => $employer_id]);
    $founding_info = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($founding_info) {
        $profileIncomplete = false;
        foreach ($founding_info as $column_value) {
            if (empty($column_value) || is_null($column_value)) {
                $profileIncomplete = true;
                break;
            }
        }
        $response['foundingInfo'] = !$profileIncomplete;
    }

    $stmt = $conn->prepare("SELECT * FROM js_social_media_company WHERE employer_id = :employer_id");
    $stmt->execute([':employer_id' => $employer_id]);
    $social_media = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($social_media) {
        $profileIncomplete = true; 
        foreach ($social_media as $column_value) {
            if (!empty($column_value) && !is_null($column_value)) {
                $profileIncomplete = false; 
                break;
            }
        }
        $response['socialMedia'] = !$profileIncomplete; 
    }
    

    $stmt = $conn->prepare("SELECT * FROM js_company_contact WHERE employer_id = :employer_id");
    $stmt->execute([':employer_id' => $employer_id]);
    $company_contact = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($company_contact) {
        $profileIncomplete = false;
        foreach ($company_contact as $column_value) {
            if (empty($column_value) || is_null($column_value)) {
                $profileIncomplete = true;
                break;
            }
        }
        $response['companyContact'] = !$profileIncomplete;
    }

    echo json_encode($response);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
?>
