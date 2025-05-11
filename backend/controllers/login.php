<?php
session_start(); // ✅ Start session at the top!

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true'); // ✅ Required for session cookies
header('Content-Type: application/json');

require_once '../config/db.php';

// ✅ Session Check for GET request (Dashboard Validation)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['user_id'])) {
        echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id']]);
        exit();
    } else {
        echo json_encode(['success' => false, 'message' => 'No active session']);
        exit();
    }
}

// ✅ Handle Login (POST Request)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data, true);

    if (!empty($data['username']) && !empty($data['password'])) {
        $username = trim($data['username']);
        $password = trim($data['password']);

        $sql = "SELECT * FROM admins WHERE username = ? LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id']; // ✅ Save session
                echo json_encode(['success' => true, 'user_id' => $_SESSION['user_id']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No user found']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
    exit();
}

$conn->close();
?>
