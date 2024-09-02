<?php
// Include the connection file
include './connection.php'; // Ensure this file contains the correct $con object

// Start the session
session_start();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data and validate
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Validate form data
    if (empty($email) || empty($password)) {
        header("Location: ../login.html?error=empty_fields");
        exit;
    }

    // Prepare SQL query using prepared statements
    $stmt = $con->prepare("SELECT id, name, password, user_type FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        // Bind result variables
        $stmt->bind_result($id, $name, $hashed_password, $user_type);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $hashed_password)) {
            // Regenerate session ID for security
            session_regenerate_id(true);

            // Set session variables
            $_SESSION['user_id'] = $id;
            $_SESSION['user_name'] = $name;
            $_SESSION['user_type'] = $user_type;

            // Redirect to a protected page or dashboard
            header("Location: ../dashboard.php");
            exit;
        } else {
            header("Location: ../login.html?error=invalid_credentials");
            exit;
        }
    } else {
        header("Location: ../login.html?error=invalid_credentials");
        exit;
    }

    // Close the statement and connection
    $stmt->close();
    $con->close();
}
?>
