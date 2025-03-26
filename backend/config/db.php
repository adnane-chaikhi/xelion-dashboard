<?php
// Database connection details
$host = "srv1318.hstgr.io"; // Hostname (use the IP or domain of your server)
$username = "u702864613_uoXpD";  // Database username
$password = "e1O>u^8#Dh";      // Database password
$dbname = "u702864613_JIjbs"; // Replace with your database name

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
