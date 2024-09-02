<?php
// Include the connection file
include './connection.php'; // Ensure this file contains the correct $con object

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $user_type = $_POST['user_type'];

    // Validate form data
    if (empty($name) || empty($email) || empty($password) || empty($confirm_password) || empty($user_type)) {
        header("Location: ../signup.html?error=empty_fields");
        exit;
    }

    if ($password !== $confirm_password) {
        header("Location: ../signup.html?error=password_mismatch");
        exit;
    }

    // Check if email already exists
    $checkEmailStmt = $con->prepare("SELECT id FROM users WHERE email = ?");
    $checkEmailStmt->bind_param("s", $email);
    $checkEmailStmt->execute();
    $checkEmailStmt->store_result();

    if ($checkEmailStmt->num_rows > 0) {
        header("Location: ../signup.html?error=email_taken");
        $checkEmailStmt->close();
        $con->close();
        exit;
    }
    $checkEmailStmt->close();

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL query using prepared statements
    $stmt = $con->prepare("INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $hashed_password, $user_type);

    if ($stmt->execute()) {
        // Registration successful, redirect to login page
        header("Location: ../login.html?success=registration");
        exit;
    } else {
        // Generic error handling for registration failure
        header("Location: ../signup.html?error=registration_failed");
        exit;
    }

    // Close the statement and connection
    $stmt->close();
    $con->close();
}
?>
