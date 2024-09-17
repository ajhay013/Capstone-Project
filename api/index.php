<?php
include 'dbconnect.php';

$objDb = new Dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.']; 

switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        if (isset($user->type)) {
            $type = $user->type;
            $created_at = date('Y-m-d');

            if ($type == 'applicant') {
                $sql = "INSERT INTO users(name, email, mobile, created_at) VALUES (:name, :email, :mobile, :created_at)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':mobile', $user->mobile);
                $stmt->bindParam(':created_at', $created_at);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Applicant registered successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to register applicant.'];
                }

            } elseif ($type == 'employer') {
                $sql = "INSERT INTO employer(name, email, mobile, created_at) VALUES (:name, :email, :mobile, :created_at)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':mobile', $user->mobile);
                $stmt->bindParam(':created_at', $created_at);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Employer registered successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to register employer.'];
                }
            }
        } else {
            $response = ['status' => 0, 'message' => 'User type not specified.'];
        }

        echo json_encode($response);
        break;
}
