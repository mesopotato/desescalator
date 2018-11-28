<?php
/**
 * Created by PhpStorm.
 * User: fabian bienz
 * Date: 11/28/2018
 * Time: 2:32 PM
 */
require ("../src/config.php");

function testconfig(){
	global $configtest, $secrettest;
	//assert($configtest["test"]==="value", "Check config file integration");
	if ($configtest["test"]==="value") {
		echo "true";
	} else{
		echo "false";
	}
	echo ($secrettest["test"]==="value" ?  "true": "false");
}


testconfig();