<?php
// Database connection details
$host = "localhost"; // Hostname (use the IP or domain of your server)
$username = "root";  // Database username
$password = "";      // Database password
$dbname = "xelion"; // Replace with your database name

// Create a new MySQLi connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check if the connection is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optional: Set the character set to avoid charset issues
$conn->set_charset("utf8mb4");

// Now you can use $conn to interact with the database
?>
