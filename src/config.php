<?php

require("../secret.php");

$API_KEY = $secret["apikey"];
$API_SECRET_KEY = $secret["apisecretkey"];
$ACCESS_TOKEN = $secret["accesstoken"];
$ACCESS_TOKEN_SECRET = $secret["accesstokensecret"];


$config = array(
	"accesskey" => ""
);

$configtest = array(
	"test" => "value"
);