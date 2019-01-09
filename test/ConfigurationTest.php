<?php
/**
 * Created by PhpStorm.
 * User: fabia_ovv7omp
 * Date: 12/16/2018
 * Time: 1:55 PM
 */

require_once __DIR__.'/../vendor/autoload.php';

use PHPUnit\Framework\TestCase;
//require_once "../src/Configuration.php";
//require_once "../src/config.php";
use Mesopotato\Desescalator\Configuration;

class ConfigurationTest extends TestCase
{
	
	public function testGetAPI_KEY()
	{
		$configuration = new Configuration();
		$this->assertNotEmpty($configuration->getAPI_KEY());
	}
	
	public function testGetACCESS_TOKEN()
	{
		$configuration = new Configuration();
		$this->assertNotEmpty($configuration->getACCESS_TOKEN());
	}
	
	public function testGetAPI_SECRET_KEY()
	{
		$configuration = new Configuration();
		$this->assertNotEmpty($configuration->getAPI_SECRET_KEY());
	}
	
	public function testGetACCESS_TOKEN_SECRET()
	{
		$configuration = new Configuration();
		$this->assertNotEmpty($configuration->getACCESS_TOKEN_SECRET());
	}
}
