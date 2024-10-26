<?php
include 'dbconnect.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php'; 
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$objDb = new Dbconnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
$response = ['status' => 0, 'message' => 'Invalid request.']; 

switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        if (isset($user->type)) {
            $type = $user->type;
            $created_at = date('Y-m-d H:i:s');
            $updated_at = null;

            switch ($type) {
                case 'applicant':
                    $table = 'js_applicants';
                    $fields = ['firstname', 'middlename', 'lastname', 'suffix', 'gender', 'contact', 'email', 'password', 'verification_code'];
                    break;
                
                case 'employer':
                    $table = 'employer';
                    $fields = ['firstname', 'lastname', 'email', 'password', 'department'];
                    break;

                default:
                    $response = ['status' => 0, 'message' => 'Invalid user type.'];
                    echo json_encode($response);
                    exit;
            }

            $requiredFields = ['email', 'lastname'];
            foreach ($requiredFields as $field) {
                if (empty($user->$field)) {
                    $response = ['status' => 0, 'message' => ucfirst($field) . ' is required.'];
                    echo json_encode($response);
                    exit;
                }
            }

            $email = filter_var(trim($user->email), FILTER_SANITIZE_EMAIL);
            $lastname = htmlspecialchars(trim($user->lastname));

            $verification_code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);

            try {
                $sql = "INSERT INTO $table (" . implode(", ", $fields) . ", created_at, updated_at) VALUES (:" . implode(", :", $fields) . ", :created_at, :updated_at)";
                $stmt = $conn->prepare($sql);
                
                foreach ($fields as $field) {
                    if ($field === 'verification_code') {
                        $stmt->bindValue(":$field", $verification_code);
                    } elseif (isset($user->$field)) {
                        if ($field === 'password') {
                            $hashedPassword = password_hash($user->password, PASSWORD_BCRYPT);
                            $stmt->bindValue(":$field", $hashedPassword);
                        } else {
                            $stmt->bindValue(":$field", htmlspecialchars(trim($user->$field)));
                        }
                    } else {
                        $stmt->bindValue(":$field", null); 
                    }
                }

                $stmt->bindValue(':created_at', $created_at);
                $stmt->bindValue(':updated_at', $updated_at);

                if ($stmt->execute()) {
                    $applicant_id = $conn->lastInsertId();

                    $sqlPersonalInfo = "INSERT INTO js_personal_info (applicant_id, created_at) VALUES (:applicant_id, :created_at)";
                    $stmtPersonalInfo = $conn->prepare($sqlPersonalInfo);
                    $stmtPersonalInfo->bindValue(':applicant_id', $applicant_id);
                    $stmtPersonalInfo->bindValue(':created_at', $created_at);

                    if ($stmtPersonalInfo->execute()) {
                        $mail = new PHPMailer(true);
                        try {
                            $mail->isSMTP();
                            $mail->Host = $_ENV['SMTP_HOST'];
                            $mail->SMTPAuth = true;
                            $mail->Username = $_ENV['SMTP_USER']; 
                            $mail->Password = $_ENV['SMTP_PASS']; 
                            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                            $mail->Port = $_ENV['SMTP_PORT'];
                            
                            $mail->setFrom($_ENV['SMTP_FROM_EMAIL'], $_ENV['SMTP_FROM_NAME']);
                            $mail->addAddress($email, $lastname);

                            // Attachments (if you have a logo to attach)
                            // $mail->addEmbeddedImage('path/to/logo.png', 'logo12'); // Ensure the path is correct

                            $mail->isHTML(true);
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

                            $response = ['status' => 1, 'message' => ucfirst($type) . 'Verification email sent.'];
                            echo json_encode($response);
                            exit();
                        } catch (Exception $e) {
                            $response = ['status' => 0, 'message' => "Something went wrong. Please try again."];
                            echo json_encode($response);
                            exit();
                        }
                    } else {
                        $response = ['status' => 0, 'message' => 'Failed to insert personal info.'];
                    }
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to register ' . $type . '.'];
                }
            } catch (PDOException $e) {
                $response = ['status' => 0, 'message' => 'Database error: ' . $e->getMessage()];
            }

        } else {
            $response = ['status' => 0, 'message' => 'User type not specified.'];
        }

        echo json_encode($response);
        break;

    default:
        echo json_encode($response);
        break;
}





/* 
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
            $created_at = date('Y-m-d H:i:s');
            $updated_at = null;

            if ($type == 'applicant') {
                $sql = "INSERT INTO applicants(firstname, middlename, lastname, suffix, gender, contact, email, password, created_at, updated_at) VALUES (:firstname, :middlename, :lastname, :suffix, :gender, :contact, :email, :password, :created_at, :updated_at)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':firstname', $user->firstname);
                $stmt->bindParam(':middlename', $user->middlename);
                $stmt->bindParam(':lastname', $user->lastname);
                $stmt->bindParam(':suffix', $user->suffix);
                $stmt->bindParam(':gender', $user->gender);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':password', $user->password);
                $stmt->bindParam(':contact', $user->contact);
                $stmt->bindParam(':created_at', $created_at);
                $stmt->bindParam(':updated_at', $updated_at);

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
            $created_at = date('Y-m-d H:i:s');
            $updated_at = null;

            switch ($type) {
                case 'applicant':
                    $table = 'applicants';
                    $fields = ['firstname', 'middlename', 'lastname', 'suffix', 'gender', 'contact', 'email', 'password'];
                    break;
                
                case 'personal_info':
                    $table = 'personal_info';
                    $fields = ['applicant_id', 'birthday', 'birthplace', 'address', 'city', 'barangay', 'postal', 'status', 'attainment', 'valid_id'];
                    break;

                case 'employer':
                    $table = 'employer';
                    $fields = ['firstname', 'lastname', 'email', 'password', 'department'];
                    break;

                default:
                    $response = ['status' => 0, 'message' => 'Invalid user type.'];
                    echo json_encode($response);
                    exit;
            }

            $sql = "INSERT INTO $table (" . implode(", ", $fields) . ", created_at, updated_at) VALUES (:" . implode(", :", $fields) . ", :created_at, :updated_at)";

            // print_r
            $stmt = $conn->prepare($sql);


            foreach ($fields as $field) {
                if (isset($user->$field)) {
                    $stmt->bindValue(":$field", $user->$field);
                } else {
                    $stmt->bindValue(":$field", null);
                }
            }

            // Hash the password for security
            if (isset($user->password)) {
                $hashedPassword = password_hash($user->password, PASSWORD_BCRYPT);
                $stmt->bindValue(':password', $hashedPassword);
            }

            // Bind the created_at and updated_at fields
            $stmt->bindValue(':created_at', $created_at);
            $stmt->bindValue(':updated_at', $updated_at);

            // Execute the query
            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => ucfirst($type) . ' registered successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to register ' . $type . '.'];
            }

        } else {
            $response = ['status' => 0, 'message' => 'User type not specified.'];
        }

        echo json_encode($response);
        break;

    default:
        echo json_encode($response);
        break;
}






REFERENCE FOR THE GET

<?php
include 'dbconnect.php';

$objDb = new Dbconnect;
$conn = $objDb->connect();

// Get the request method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Handle GET requests
        if (isset($_GET['user_type'])) {
            $user_type = $_GET['user_type'];

            if ($user_type == 'applicant') {
                // Fetch Applicants
                $sql = "SELECT * FROM applicants";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $applicants = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response = ['status' => 1, 'data' => $applicants];

            } elseif ($user_type == 'employee') {
                // Fetch Employees
                $sql = "SELECT * FROM employees";
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response = ['status' => 1, 'data' => $employees];

            } else {
                $response = ['status' => 0, 'message' => 'Invalid user type'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'No user type provided'];
        }
        // Return the response in JSON format
        echo json_encode($response);
        break;

    case 'POST':
        // Handle POST requests
        $user = json_decode(file_get_contents('php://input'));

        if (isset($user->user_type)) {
            $user_type = $user->user_type;
            $created_at = date('Y-m-d');

            if ($user_type == 'applicant') {
                // Insert into applicants
                $sql = "INSERT INTO applicants(name, email, resume, created_at) VALUES (:name, :email, :resume, :created_at)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':resume', $user->resume);
                $stmt->bindParam(':created_at', $created_at);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Applicant registered successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to register applicant.'];
                }

            } elseif ($user_type == 'employee') {
                // Insert into employees
                $sql = "INSERT INTO employees(name, email, position, salary, created_at) VALUES (:name, :email, :position, :salary, :created_at)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':name', $user->name);
                $stmt->bindParam(':email', $user->email);
                $stmt->bindParam(':position', $user->position);
                $stmt->bindParam(':salary', $user->salary);
                $stmt->bindParam(':created_at', $created_at);

                if ($stmt->execute()) {
                    $response = ['status' => 1, 'message' => 'Employee registered successfully.'];
                } else {
                    $response = ['status' => 0, 'message' => 'Failed to register employee.'];
                }

            } else {
                $response = ['status' => 0, 'message' => 'Invalid user type.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'No user type provided.'];
        }
        // Return the response in JSON format
        echo json_encode($response);
        break;

    default:
        // If the request method is not GET or POST
        $response = ['status' => 0, 'message' => 'Invalid request method'];
        echo json_encode($response);
        break;
}



*/