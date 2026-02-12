<?php
require_once 'db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $photo_id = $_POST['photo_id'] ?? null;
    $comment = $_POST['comment'] ?? '';
    $user_name = $_POST['user_name'] ?? 'अनामिक (Guest)';

    if (!$photo_id || empty(trim($comment))) {
        echo json_encode(['status' => 'error', 'message' => 'माहिती अपूर्ण आहे.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO gallery_comments (photo_id, comment, user_name) VALUES (?, ?, ?)");
        if ($stmt->execute([$photo_id, $comment, $user_name])) {
            echo json_encode(['status' => 'success', 'message' => 'कमेंट जोडली गेली आहे.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'कमेंट सेव्ह करताना अडचण आली.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $photo_id = $_GET['photo_id'] ?? null;
    
    if (!$photo_id) {
        echo json_encode(['status' => 'error', 'message' => 'फोटो आयडी आवश्यक आहे.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("SELECT * FROM gallery_comments WHERE photo_id = ? ORDER BY created_at DESC");
        $stmt->execute([$photo_id]);
        $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>
