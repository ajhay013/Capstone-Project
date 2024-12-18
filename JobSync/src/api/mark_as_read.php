<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $sql = "UPDATE js_job_alert SET is_read = 1 WHERE is_read = 0";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'All alerts marked as read']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error marking alerts as read']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
?>
