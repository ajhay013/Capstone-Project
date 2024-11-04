<?php
include 'dbconnect.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php'; 
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$objDb = new Dbconnect();
$pdo = $objDb->connect();
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['document'], $data['face'], $data['backSideId'], $data['email'], $data['lastName'], $data['password'])) {
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$api_key = "sqXDb3aRlIakD7ucNk1gnMh9JaOniJee"; 
$api_url = "https://api2.idanalyzer.com/scan";

$uploads_dir = 'uploads';
if (!is_dir($uploads_dir)) {
    mkdir($uploads_dir, 0755, true);
}

$document_image = base64_decode($data['document']);
$face_image = base64_decode($data['face']);
$back_image = base64_decode($data['backSideId']);
$document_filename = $uploads_dir . '/document_' . uniqid() . '.png';
$face_filename = $uploads_dir . '/face_' . uniqid() . '.png';
$back_filename = $uploads_dir . '/back_' . uniqid() . '.png';

if (!file_put_contents($document_filename, $document_image) ||
    !file_put_contents($face_filename, $face_image) ||
    !file_put_contents($back_filename, $back_image)) {
    echo json_encode(['error' => 'Failed to save images to the server']);
    exit;
}

$payload = json_encode([
    "profile" => "security_medium",
    "document" => $data['document'],
    "face" => $data['face'],
    "documentSide" => $data['backSideId']
]);

$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-API-KEY: ' . $api_key,
    'Accept: application/json',
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo json_encode(['error' => $error]);
    exit;
}

$response_data = json_decode($response, true);
$decision = isset($response_data['decision']) ? $response_data['decision'] : 'Unknown';

if (isset($response_data['document']['expiry'])) {
    $expiry_date = $response_data['document']['expiry'];
    $expiry_timestamp = strtotime($expiry_date);
    if ($expiry_timestamp < time()) {
        echo json_encode(['error' => 'ID is expired']);
        exit;
    }
}
$email = $data['email'];
$lastname = $data['lastName'];
$type = $data['type'];
$warnings = [];
$warningMessages = [
    'DOCUMENT_FACE_NOT_FOUND' => 'Document Face Not Found ',
    'FAKE_ID' => 'The ID is Fake ',
    'MISSING_ENDORSEMENT' => 'Missing Endorsement ',
    'MISSING_ISSUE_DATE' => 'Missing Issue Date ',
    'DOCUMENT_EXPIRED' => 'Document Expired ',
    'IMAGE_EDITED' => 'Image Edited ',
    'FACE_MISMATCH' => 'Face Mismatch',
    'SELFIE_FACE_NOT_FOUND' => 'Selfie Face Not Found',
    'IMAGE_FORGERY' => 'Image Forgery'
];

if (isset($response_data['warning']) && is_array($response_data['warning'])) {
    foreach ($response_data['warning'] as $warning) {
        if ($warning['decision'] !== 'accept') {
            $code = $warning['code'];
            $warnings[] = $warningMessages[$code] ?? $code;
        }
    }
}
try {
    if ($decision === 'reject') {
        echo json_encode([
            'error' => 'Your ID verification has been rejected.',
            'warnings' => $warnings
        ]);
        exit;
    } elseif ($decision === 'Unknown') {
        echo json_encode([
            'error' => 'The ID verification decision is unknown. Please contact support.',
            'warnings' => $warnings
        ]);
        exit;
    }

    elseif ($decision === 'accept') {
        echo json_encode([
            'decision' => 'accept'
        ]);
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER'];
    $mail->Password = $_ENV['SMTP_PASS'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $_ENV['SMTP_PORT'];

    $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
    $mail->addAddress($email, $lastname);
    $mail->isHTML(true);

    $verification_code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);

    $mail->Subject = 'Email Verification for ' . ucfirst($type) . ' Registration';
    $mail->Body = '<div class="container" style="display: flex; justify-content: center; text-align: center;">
                    <div class="contents" style="border: 1px solid black; width: 100%;">
                        <p style="font-size: 20px; padding: 20px;">
                            <img src="cid:logo12" style="max-width: 150px;" alt="Jobsync Logo"><br>
                            Dear ' . ucfirst($type) . ',<br><br>
                            Your Verification code is:<br><br>
                            <b style="font-size: 40px;">' . $verification_code . '</b><br><br>
                            Please use the provided code to complete your registration.<br>
                            If you have not made this request, please disregard this notification.<br><br>
                            Thank you,<br>
                            JobSync.
                        </p>
                    </div>
                </div>';

    // $mail->addEmbeddedImage('path/to/logo.png', 'logo12');

    $mail->send();

    $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);

    $sql = "INSERT INTO js_employer_info (firstname, middlename, lastname, suffix, contact, position, email, password, verification_code, document_path, face_path, back_side_path, decision) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $params = [
        $data['firstName'], 
        $data['middleName'], 
        $data['lastName'], 
        $data['suffix'] ?? null, 
        $data['contactNumber'], 
        $data['position'], 
        $data['email'], 
        $hashed_password, 
        $verification_code,
        $document_filename, 
        $face_filename, 
        $back_filename, 
        $decision
    ];
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
        exit;
    }

} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to process request: ' . $e->getMessage()]);
    exit;
}

echo json_encode(['decision' => $decision]);

$pdo = null;