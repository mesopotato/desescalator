<?php
/**
 * @Deprecated
 */

require("../../desescalator_config/secret.php");

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

trigger_error("config.php is deprecated. Use Configuration.php instead.",E_USER_NOTICE);
