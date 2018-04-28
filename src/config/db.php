<?php
  class db {
    private $dbhost = 'localhost';
    private $dbuser = 'root';
    private $dbpass = '';
    private $dbname = 'api';

    public function connect() {
      $connectionString = "mysql:host=$this->dbhost;dbname=$this->dbname;";
      $dbConnection = new PDO($connectionString, $this->dbuser, $this->dbpass);
      $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $dbConnection;
    }
  }
 ?>
