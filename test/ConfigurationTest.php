<?php
/**
 * Created by PhpStorm.
 * User: fabia_ovv7omp
 * Date: 12/16/2018
 * Time: 1:55 PM
 */

use PHPUnit\Framework\TestCase;
require_once "../src/Configuration.php";
require_once "../src/config.php";


class ConfigurationTest extends TestCase
{
	
	public function testGetAPI_KEY()
	{
		global $API_KEY;
		$configuration = new Configuration();
		$this->assertEquals($API_KEY,$configuration->getAPI_KEY());
	}
	
	public function testGetACCESS_TOKEN()
	{
		global $ACCESS_TOKEN;
		$configuration = new Configuration();
		$this->assertEquals($ACCESS_TOKEN,$configuration->getACCESS_TOKEN());
	}
	
	public function testGetAPI_SECRET_KEY()
	{
		global $API_SECRET_KEY;
		$configuration = new Configuration();
		$this->assertEquals($API_SECRET_KEY,$configuration->getAPI_SECRET_KEY());
	}
	
	public function testGetACCESS_TOKEN_SECRET()
	{
		global $ACCESS_TOKEN_SECRET;
		$configuration = new Configuration();
		$this->assertEquals($ACCESS_TOKEN_SECRET, $configuration->getACCESS_TOKEN_SECRET());
	}
}
