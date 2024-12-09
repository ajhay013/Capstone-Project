<?php 
include 'dbconnect.php';

$objDb = new Dbconnect();
$pdo = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/resume/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
        $allowedExtensions = ['pdf'];

        if (!in_array(strtolower($fileExtension), $allowedExtensions)) {
            echo json_encode(['success' => false, 'message' => 'Invalid file type. Only PDF is allowed.']);
            exit;
        }

        $newFileName = pathinfo($fileName, PATHINFO_FILENAME) . '_' . uniqid() . '.' . $fileExtension;
        $destPath = $uploadDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $applicant_id = $_POST['applicant_id'] ?? null;
            $cvName = $_POST['cv_name'] ?? null;

            if (!$applicant_id || !$cvName) {
                echo json_encode(['success' => false, 'message' => 'All fields are required.']);
                exit;
            }

            try {
                $checkStmt = $pdo->prepare('SELECT COUNT(*) FROM js_applicant_resume WHERE applicant_id = :applicant_id');
                $checkStmt->execute([':applicant_id' => $applicant_id]);
                $resumeCount = $checkStmt->fetchColumn();

                if ($resumeCount >= 5) {
                    echo json_encode(['success' => false, 'message' => 'You have reached the maximum limit of 5 resumes.']);
                    exit;
                }

                $insertStmt = $pdo->prepare('INSERT INTO js_applicant_resume (applicant_id, resumeName, resumePath) VALUES (:applicant_id, :cv_name, :file_path)');
                $insertStmt->execute([
                    ':applicant_id' => $applicant_id,
                    ':cv_name' => $cvName,
                    ':file_path' => $destPath
                ]);

                echo json_encode(['success' => true, 'message' => 'Resume uploaded successfully!']);
            } catch (PDOException $e) {
                echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload the file.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or upload error occurred.']);
    }
}
?>
