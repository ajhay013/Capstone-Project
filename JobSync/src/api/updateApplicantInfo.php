<?php 
include 'dbconnect.php';

$objDb = new Dbconnect();
$conn = $objDb->connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $profile_picture = $data['profile_picture'] ?? null;
    $profile_picture_path = null;

    if ($profile_picture) {
        $profile_picture_path = 'uploads/profile_' . uniqid() . '.png'; 
        file_put_contents($profile_picture_path, base64_decode($profile_picture));
    }

    $applicant_id = $data['applicant_id'];
    $firstname = $data['firstname'];
    $middlename = $data['middlename'];
    $lastname = $data['lastname'];
    $suffix = $data['suffix'];
    $gender = $data['gender'];
    $contact = $data['contact'];
    $headline = $data['headline'];
    $birthday = $data['birthday'];
    $birthplace = $data['birthplace'];
    $marital_status = $data['marital_status'];
    $experience = $data['experience'];
    $education = $data['education'];
    $nationality = $data['nationality'];

    try {
        $conn->beginTransaction();

        $updateApplicantsQuery = "
            UPDATE js_applicants 
            SET firstname = :firstname, 
                middlename = :middlename, 
                lastname = :lastname, 
                suffix = :suffix, 
                gender = :gender, 
                contact = :contact";

        $applicantsParams = [
            ':firstname' => $firstname,
            ':middlename' => $middlename,
            ':lastname' => $lastname,
            ':suffix' => $suffix,
            ':gender' => $gender,
            ':contact' => $contact,
            ':applicant_id' => $applicant_id
        ];

        if ($profile_picture_path) {
            $updateApplicantsQuery .= ", profile_picture = :profile_picture";
            $applicantsParams[':profile_picture'] = $profile_picture_path;
        }

        $updateApplicantsQuery .= " WHERE applicant_id = :applicant_id";

        $stmt = $conn->prepare($updateApplicantsQuery);
        $stmt->execute($applicantsParams);

        $stmt2 = $conn->prepare("
            UPDATE js_personal_info 
            SET headline = :headline, 
                birthday = :birthday, 
                birthplace = :birthplace, 
                status = :marital_status, 
                experience = :experience, 
                attainment = :education,
                nationality = :nationality 
            WHERE applicant_id = :applicant_id
        ");
        
        $stmt2->execute([
            ':headline' => $headline,
            ':birthday' => $birthday,
            ':birthplace' => $birthplace,
            ':marital_status' => $marital_status,
            ':experience' => $experience,
            ':education' => $education,
            ':nationality' => $nationality,
            ':applicant_id' => $applicant_id
        ]);

        $conn->commit();

        echo json_encode(["success" => true, "message" => "Save changes successfully."]);
    } catch (Exception $e) {
        $conn->rollBack();
        echo json_encode(["success" => false, "message" => "Failed to save: " . $e->getMessage()]);
    }
}
?>
