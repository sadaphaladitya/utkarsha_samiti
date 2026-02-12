<?php
require_once 'db_config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $student_name = $_POST['student-name'] ?? '';
    $dob = $_POST['dob'] ?? '';
    $parent_name = $_POST['parent-name'] ?? '';
    $mobile = $_POST['mobile'] ?? '';
    $class = $_POST['class'] ?? '';
    $address = $_POST['address'] ?? '';
    $notes = $_POST['notes'] ?? '';

    if (!$student_name || !$dob || !$parent_name || !$mobile || !$class || !$address) {
        echo json_encode(['status' => 'error', 'message' => 'कृपया सर्व आवश्यक माहिती भरा.']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO admissions (student_name, dob, parent_name, mobile, standard, address, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$student_name, $dob, $parent_name, $mobile, $class, $address, $notes]);
        echo json_encode(['status' => 'success', 'message' => 'प्रवेश अर्ज यशस्वीरित्या सादर झाला आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => 'डेटाबेस त्रुटी: ' . $e->getMessage()]);
    }
}
?>
