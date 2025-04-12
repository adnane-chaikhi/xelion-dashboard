<?php
// Enable CORS
header("Access-Control-Allow-Origin: *"); // Allow any origin to access
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS"); // Allowed HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allowed headers
require_once '../config/db.php';

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Stop the execution for OPTIONS requests
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// // Handling GET requests with INNER JOIN to get client name
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT users.id, users.name, users.email, users.password, users.role_id, 
                    roles.role_name, 
                    users.created_at 
                FROM users 
                INNER JOIN roles ON users.role_id = roles.id;
                ";
    
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode($users); // Send back the bookings data in JSON format
    } else {
        echo json_encode(["message" => "No users found."]);
    }
}

// Handling POST requests
elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the POST data (assume it's in JSON format)
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['client_name'], $data['client_email'], $data['client_phone'], $data['client_address'], $data['service_type'], $data['booking_date'], $data['status'])) {
        
        // Client data
        $clientName = $data['client_name'];
        $clientEmail = $data['client_email'];
        $clientPhone = $data['client_phone'];
        $clientAddress = $data['client_address'];
        
        // Booking data
        $serviceType = $data['service_type'];
        $bookingDate = $data['booking_date'];
        $status = $data['status'];
        
        // Check if the client already exists (based on email)
        $checkClientQuery = "SELECT id FROM clients WHERE email = ?";
        $stmt = $conn->prepare($checkClientQuery);
        $stmt->bind_param("s", $clientEmail);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            // If client exists, get the client_id
            $client = $result->fetch_assoc();
            $clientId = $client['id'];
        } else {
            // If client doesn't exist, insert the new client
            $insertClientQuery = "INSERT INTO clients (name, email, phone_number, address) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($insertClientQuery);
            $stmt->bind_param("ssss", $clientName, $clientEmail, $clientPhone, $clientAddress);
            $stmt->execute();
            $clientId = $stmt->insert_id; // Get the client_id of the newly inserted client
        }

        // Insert booking data into bookings table
        $insertBookingQuery = "INSERT INTO bookings (client_id, service_type, booking_date, status, created_at, updated_at) 
                               VALUES (?, ?, ?, ?, NOW(), NOW())";
        
        $stmt = $conn->prepare($insertBookingQuery);
        $stmt->bind_param("isss", $clientId, $serviceType, $bookingDate, $status);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Booking added successfully"]);
        } else {
            echo json_encode(["message" => "Error adding booking"]);
        }
    } else {
        echo json_encode(["message" => "Invalid input data"]);
    }
}

// Handling DELETE requests
elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    // Get the DELETE data (assume it's in JSON format)
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $id = $data['id'];
        
        $sql = "DELETE FROM bookings WHERE id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Booking deleted successfully"]);
        } else {
            echo json_encode(["message" => "Error deleting booking"]);
        }
    } else {
        echo json_encode(["message" => "Booking ID not provided"]);
    }
}

// Handling PUT requests to update booking status
elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Get the PUT data (assume it's in JSON format)
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'], $data['status'])) {
        $id = $data['id'];
        $status = $data['status'];

        // Update the booking's status
        $updateQuery = "UPDATE bookings SET status = ?, updated_at = NOW() WHERE id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("si", $status, $id);
        
        if ($stmt->execute()) {
            echo json_encode(["message" => "Booking status updated successfully"]);
        } else {
            echo json_encode(["message" => "Error updating booking status"]);
        }
    } else {
        echo json_encode(["message" => "Invalid input data"]);
    }
}

$conn->close();
?>
