<?php
require_once 'db_config.php';

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM gallery ORDER BY created_at DESC");
    $photos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($photos);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
