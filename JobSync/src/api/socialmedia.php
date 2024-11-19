<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data['employer_id']) && isset($data['socialLinks'])) {
        $employer_id = $data['employer_id'];
        $socialLinks = $data['socialLinks'];

        $insertStmt = $conn->prepare("INSERT INTO js_social_media_company (employer_id, social_media, media_link) VALUES (:employer_id, :socialmedia, :medialink)");
        $updateStmt = $conn->prepare("UPDATE js_social_media_company SET media_link = :medialink WHERE employer_id = :employer_id AND social_media = :socialmedia");

        foreach ($socialLinks as $link) {
            $checkStmt = $conn->prepare("SELECT COUNT(*) FROM js_social_media_company WHERE employer_id = :employer_id AND social_media = :socialmedia");
            $checkStmt->execute([
                ':employer_id' => $employer_id,
                ':socialmedia' => $link['platform']
            ]);

            $exists = $checkStmt->fetchColumn() > 0;

            if ($exists) {
                $updateStmt->execute([
                    ':employer_id' => $employer_id,
                    ':socialmedia' => $link['platform'],
                    ':medialink' => $link['link']
                ]);
            } else {
                $insertStmt->execute([
                    ':employer_id' => $employer_id,
                    ':socialmedia' => $link['platform'],
                    ':medialink' => $link['link']
                ]);
            }
        }

        echo json_encode(['message' => 'Social links saved or updated successfully']);
    } else {
        echo json_encode(['error' => 'Invalid data', 'received_data' => $data]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
