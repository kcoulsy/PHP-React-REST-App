<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//-----------------------------------------------------
//Setup tables
//-----------------------------------------------------
$app->get('/init', function(Request $request, Response $response){
$sql = 'CREATE TABLE IF NOT EXISTS `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(255) NOT NULL ,
  `first_name` VARCHAR(255) NOT NULL ,
  `last_name` VARCHAR(255) NOT NULL ,
  `email` VARCHAR(255) NOT NULL ,
  `type` VARCHAR(255) NOT NULL ,
  `enabled` BIT NOT NULL ,
  PRIMARY KEY (`id`)) ENGINE = InnoDB;';
  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->query($sql);
    $db = null;
    echo '{"notice": {"text": "Table Created"}}';
  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});
//-----------------------------------------------------
// GET user count
//-----------------------------------------------------
$app->get('/users', function(Request $request, Response $response){
  $sql = "SELECT * FROM users";
  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->query($sql);
    $users = $stmt->rowCount();
    $db = null;
      echo '{"Users": {"count": ' . $users . '}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});

//-----------------------------------------------------
// GET user count given username (to check if it exists)
//-----------------------------------------------------
$app->get('/user/username/{username}', function(Request $request, Response $response){
  $username = $request->getAttribute('username');
  $sql = "SELECT * FROM users WHERE username = :username";

  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $users = $stmt->rowCount();
    $db = null;
      echo '{"Users": { "username": "' . $username . '", "count": ' . $users . '}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});
//-----------------------------------------------------
// GET user count given username (to check if it exists)
//-----------------------------------------------------
$app->get('/user/email/{email}', function(Request $request, Response $response){
  $email = $request->getAttribute('email');
  $sql = "SELECT * FROM users WHERE email = :email";
  try {
    $db = new db();
    //connect
    $db = $db->connect();
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $users = $stmt->rowCount();
    $db = null;
      echo '{"Users": { "email": "' . $email . '", "count": ' . $users . '}}';

  } catch(PDOException $e) {
    echo '{"error":{"text":' . $e->getMessage() . '}}';
  }
});
//-----------------------------------------------------
// GET all Users
//-----------------------------------------------------
$app->get('/users/{offset}', function(Request $request, Response $response){
  $offset = $request->getAttribute('offset');
  if(is_numeric($offset)){
    $sql = "SELECT * FROM users LIMIT 10 OFFSET $offset";
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
  } else {
    echo '{"error":{"text":"Offset is not a number"}}';
  }
  });
//-----------------------------------------------------
// GET a User given an ID
//-----------------------------------------------------
$app->get('/user/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');
  if(is_numeric($id)){
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
  } else {
    echo '{"error":{"text":"ID is not a number"}}';
  }
});

//-----------------------------------------------------
// POST a new User
//-----------------------------------------------------
$app->post('/user/add', function(Request $request, Response $response){
  $username = $request->getParam('username');
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $email = $request->getParam('email');
  $type = $request->getParam('type');
  $enabled = $request->getParam('enabled');

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
$app->put('/user/update/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');
  $username = $request->getParam('username');
  $first_name = $request->getParam('first_name');
  $last_name = $request->getParam('last_name');
  $email = $request->getParam('email');
  $type = $request->getParam('type');
  $enabled = $request->getParam('enabled');
  //DO THE BACKEND CHECKS TO MAKE SURE THEY ARE VALID
  //***********************************

  if(is_numeric($id)){
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
  } else {
    echo '{"error":{"text":"ID is not a number"}}';
  }
});

//-----------------------------------------------------
// DELETE a User given an ID
//-----------------------------------------------------
$app->delete('/user/delete/{id}', function(Request $request, Response $response){
  $id = $request->getAttribute('id');
  if(is_numeric($id)){
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
  } else {
    echo '{"error":{"text":"ID is not a number"}}';
  }
});

//-----------------------------------------------------
// DELETE all users
//-----------------------------------------------------
$app->delete('/users/delete', function(Request $request, Response $response){

    $sql = "DELETE FROM users";

    try {
      $db = new db();
      //connect
      $db = $db->connect();

      $stmt = $db->prepare($sql);
      $stmt->execute();

      $db = null;
      echo '{"notice": {"text": "All Users Deleted"}}';

    } catch(PDOException $e) {
      echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
});
