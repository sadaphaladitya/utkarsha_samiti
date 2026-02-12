<?php
require_once 'db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $desc = $_POST['desc'] ?? '';
    $file = $_FILES['photo'] ?? null;

    if (!$title || !$file) {
        echo json_encode(['status' => 'error', 'message' => 'माहिती अपूर्ण आहे.']);
        exit;
    }

    $targetDir = "uploads/";
    $fileName = time() . '_' . basename($file["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

    // Allow certain file formats
    $allowTypes = array('jpg', 'png', 'jpeg', 'gif');
    if (in_array(strtolower($fileType), $allowTypes)) {
        if (move_uploaded_file($file["tmp_name"], $targetFilePath)) {
            try {
                $stmt = $pdo->prepare("INSERT INTO gallery (title, description, image_path) VALUES (?, ?, ?)");
                $stmt->execute([$title, $desc, $targetFilePath]);
                echo json_encode(['status' => 'success', 'message' => 'फोटो यशस्वीरित्या अपलोड झाला आहे.', 'path' => $targetFilePath]);
            } catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'message' => 'डेटाबेस त्रुटी: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'फाईल कॉपी करताना चूक झाली.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'फक्त JPG, JPEG, PNG, आणि GIF फाईल्स चालतील.']);
    }
}
?>
