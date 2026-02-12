<?php
require_once 'db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'] ?? null;

    if (!$id) {
        echo json_encode(['status' => 'error', 'message' => 'फोटो आयडी प्राप्त झाला नाही.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("UPDATE gallery SET likes = likes + 1 WHERE id = ?");
        if ($stmt->execute([$id])) {
            $stmt = $pdo->prepare("SELECT likes FROM gallery WHERE id = ?");
            $stmt->execute([$id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'likes' => $result['likes']]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'लाईक करताना अडचण आली.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>
