<?php
	$i = 1;
	$host = 'localhost';
	$user = 'root';
	$password = '';
	$database = 'finanzmanager';
	$table = 'user';
	$dsn = 'mysql:host=' .$host. ';dbname=' .$database;
	$options = array(
		PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
?>