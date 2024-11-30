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
        $stmt = $conn->prepare("
            SELECT 
                facebook_icon AS Facebook,
                instagram_icon AS Instagram,
                youtube_icon AS YouTube,
                twitter_icon AS Twitter,
                pinterest_icon AS Pinterest,
                reddit_icon AS Reddit,
                whatsapp_business_icon AS WhatsApp,
                telegram_icon AS Telegram,
                wechat_icon AS WeChat
            FROM js_social_media_company 
            WHERE employer_id = :employer_id
        ");
        $stmt->bindParam(':employer_id', $employer_id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $socialLinks = [];
        foreach ($row as $platform => $link) {
            if ($link) {
                $socialLinks[] = [
                    'platform' => $platform,
                    'link' => $link
                ];
            }
        }

        echo json_encode(['socialLinks' => $socialLinks]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Query execution failed: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method or missing employer_id']);
}
?>
