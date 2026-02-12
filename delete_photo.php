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
        // 1. Get the image path first to delete the file from the folder
        $stmt = $pdo->prepare("SELECT image_path FROM gallery WHERE id = ?");
        $stmt->execute([$id]);
        $photo = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($photo) {
            $filePath = $photo['image_path'];
            
            // 2. Delete from database
            $deleteStmt = $pdo->prepare("DELETE FROM gallery WHERE id = ?");
            if ($deleteStmt->execute([$id])) {
                // 3. Delete file from filesystem if it exists
                if (file_exists($filePath)) {
                    unlink($filePath);
                }
                echo json_encode(['status' => 'success', 'message' => 'फोटो यशस्वीरित्या काढला गेला आहे.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'डेटाबेसमधून फोटो काढताना अडचण आली.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'फोटो सापडला नाही.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'डेटाबेस त्रुटी: ' . $e->getMessage()]);
    }
}
?>
