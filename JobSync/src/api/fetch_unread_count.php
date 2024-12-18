<?php
include 'dbconnect.php';

try {
    $objDb = new Dbconnect();
    $conn = $objDb->connect();

    $sql = "SELECT COUNT(*) AS unread_count FROM js_job_alert WHERE is_read = 0";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['success' => true, 'unread_count' => $result['unread_count']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error fetching unread count']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
    $conn = null;
}
?>
