<?php
// Database configuration
$serverName = "localhost"; // Change as needed
$connectionInfo = array("Database" => "crud_app", "UID" => "", "PWD" => "");

// Establish a connection to the database
$conn = sqlsrv_connect($serverName, $connectionInfo);
if ($conn === false) {
    die(json_encode(['error' => 'Connection failed: ' . print_r(sqlsrv_errors(), true)]));
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get parameters from POST request and check if they are set
    $action = isset($_POST['action']) ? $_POST['action'] : null;
    //$id = isset($_POST['id']) ? $_POST['id'] : null;
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $dob = isset($_POST['dob']) ? $_POST['dob'] : null;
    $phone = isset($_POST['phone']) ? $_POST['phone'] : null;

    // Validate required parameters based on action
    if ($action === 'create' || $action === 'update') {
        if (!isset($name) || !isset($email) || !isset($dob) || !isset($phone)) {
            die(json_encode(['error' => 'Missing parameters for create/update action']));
        }
    } elseif ($action === 'delete') {
        if (!isset($id)) {
            die(json_encode(['error' => 'Missing ID parameter for delete action']));
        }
    } elseif ($action === 'read') {
        // No additional parameters required for read action
    } else {
        die(json_encode(['error' => 'Invalid action']));
    }

    // Prepare the SQL statement to call the stored procedure
    $sql = "{CALL ManageUser(?, ?, ?, ?, ?, ?)}";
    $params = array($action, $id, $name, $email, $dob, $phone);

    // Execute the stored procedure
    $stmt = sqlsrv_query($conn, $sql, $params);
    if ($stmt === false) {
        die(json_encode(['error' => 'Error executing procedure: ' . print_r(sqlsrv_errors(), true)]));
    }

    // Handle responses based on action type
    if ($action == 'read') {
        $resultArray = [];
        while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
            $resultArray[] = $row;
        }
        echo json_encode($resultArray);
    } else {
        echo json_encode(['success' => true]);
    }

    // Close statement
    sqlsrv_free_stmt($stmt);
} else {
    echo json_encode(['error' => 'Invalid request method. Only POST requests are allowed.']);
}

// Close connection
sqlsrv_close($conn);
?>