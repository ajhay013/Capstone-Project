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
$applicant_id = $data['applicant_id'] ?? null;  

if ($applicant_id) {
    try {
        $stmt = $conn->prepare("SELECT facebook_icon as Facebook, instagram_icon as Instagram, youtube_icon as YouTube, twitter_icon as Twitter, tiktok_icon as Tiktok, dribble_icon as Dribble, github_icon as Github, reddit_icon as Reddit, freelancer_icon as Freelancer FROM js_applicant_socialmedia WHERE applicant_id = :applicant_id LIMIT 1");
        $stmt->execute([':applicant_id' => $applicant_id]);
        $socialMedia = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($socialMedia) {
            echo json_encode([
                "success" => true,
                "data" => $socialMedia
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "No social media data found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error fetching social media data: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request data."]);
}
?>
