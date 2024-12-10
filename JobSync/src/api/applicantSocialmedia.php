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

if (isset($data['applicant_id']) && isset($data['socialLinks'])) {
    $applicant_id = $data['applicant_id'];
    $socialLinks = $data['socialLinks'];

    $links = array_fill_keys(['Facebook', 'Instagram', 'YouTube', 'Twitter', 'Tiktok', 'Dribbble', 'Github', 'Reddit', 'Freelancer'], null);

    foreach ($socialLinks as $link) {
        if (!empty($link['link'])) {
            $links[$link['platform']] = $link['link'];
        }
    }

    try {
        // Check if the applicant already has social media data
        $stmt = $conn->prepare("SELECT COUNT(*) FROM js_applicant_socialmedia WHERE applicant_id = :applicant_id");
        $stmt->execute([':applicant_id' => $applicant_id]);
        $count = $stmt->fetchColumn();

        if ($count > 0) {
            // If record exists, perform an UPDATE
            $stmt = $conn->prepare(
                "UPDATE js_applicant_socialmedia
                 SET 
                    facebook_icon = :facebook,
                    instagram_icon = :instagram,
                    youtube_icon = :youtube,
                    twitter_icon = :twitter,
                    tiktok_icon = :tiktok,
                    dribble_icon = :dribble,
                    github_icon = :github,
                    reddit_icon = :reddit,
                    freelancer_icon = :freelancer,
                    updated_at = NOW()
                 WHERE applicant_id = :applicant_id"
            );
            $stmt->execute([
                ':applicant_id' => $applicant_id,
                ':facebook' => $links['Facebook'],
                ':instagram' => $links['Instagram'],
                ':youtube' => $links['YouTube'],
                ':twitter' => $links['Twitter'],
                ':tiktok' => $links['Tiktok'],
                ':dribble' => $links['Dribbble'],
                ':github' => $links['Github'],
                ':reddit' => $links['Reddit'],
                ':freelancer' => $links['Freelancer']
            ]);

            echo json_encode(["success" => true, "message" => "Social Media links saved successfully."]);
        } else {
            $stmt = $conn->prepare(
                "INSERT INTO js_applicant_socialmedia 
                    (applicant_id, facebook_icon, instagram_icon, youtube_icon, twitter_icon, tiktok_icon, dribble_icon, github_icon, reddit_icon, freelancer_icon, created_at, updated_at) 
                VALUES 
                    (:applicant_id, :facebook, :instagram, :youtube, :twitter, :tiktok, :dribble, :github, :reddit, :freelancer, NOW(), NOW())"
            );
            $stmt->execute([
                ':applicant_id' => $applicant_id,
                ':facebook' => $links['Facebook'],
                ':instagram' => $links['Instagram'],
                ':youtube' => $links['YouTube'],
                ':twitter' => $links['Twitter'],
                ':tiktok' => $links['Tiktok'],
                ':dribble' => $links['Dribbble'],
                ':github' => $links['Github'],
                ':reddit' => $links['Reddit'],
                ':freelancer' => $links['Freelancer']
            ]);

            echo json_encode(["success" => true, "message" => "Social Media links saved successfully."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Failed to save social links: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request data."]);
}
?>
