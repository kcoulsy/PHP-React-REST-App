<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//-----------------------------------------------------
// GET all Users
//-----------------------------------------------------
$app->get('/api/users', function(Request $request, Response $response){
  $sql = "SELECT * FROM users";
  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($users);

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});

//-----------------------------------------------------
// GET a User given an ID
//-----------------------------------------------------
$app->get('/api/user/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');

  $sql = "SELECT * FROM users WHERE id = $id";
  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($users);

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});

//-----------------------------------------------------
// POST a new User
//-----------------------------------------------------
$app->post('/api/user/add', function(Request $request, Response $response){
  $username = $request->getParam('username');
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $email = $request->getParam('email');
  $type = $request->getParam('type');
  $enabled = $request->getParam('enabled');
  //DO THE BACKEND CHECKS TO MAKE SURE THEY ARE VALID
  //***********************************
  $sql = "INSERT INTO users (username, first_name, last_name, email, type, enabled)
          VALUES (:username, :first_name, :last_name, :email, :type, :enabled)";
  try {
    $db = new db();
    //connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':enabled', $enabled);

    $stmt->execute();

    $db = null;
    echo '{"notice": {"text": "User Added"}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});

//-----------------------------------------------------
// UPDATE a User given an ID
//-----------------------------------------------------
$app->put('/api/user/update/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');
  $username = $request->getParam('username');
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $email = $request->getParam('email');
  $type = $request->getParam('type');
  $enabled = $request->getParam('enabled');
  //DO THE BACKEND CHECKS TO MAKE SURE THEY ARE VALID
  //***********************************
  $sql = "UPDATE users SET
            username = :username,
            first_name = :first_name,
            last_name = :last_name,
            email = :email,
            type = :type,
            enabled = :enabled
          WHERE id = $id";
  try {
    $db = new db();
    //connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':first_name', $first_name);
    $stmt->bindParam(':last_name', $last_name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':type', $type);
    $stmt->bindParam(':enabled', $enabled);

    $stmt->execute();

    $db = null;
    echo '{"notice": {"text": "User Updated"}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});

//-----------------------------------------------------
// DELETE a User given an ID
//-----------------------------------------------------
$app->delete('/api/user/delete/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');

  $sql = "DELETE FROM users WHERE id = $id";

  try {
    $db = new db();
    //connect
    $db = $db->connect();

    $stmt = $db->prepare($sql);
    $stmt->execute();

    $db = null;
    echo '{"notice": {"text": "User Deleted"}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});
