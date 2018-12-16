<?php
/**
 * Created by PhpStorm.
 * User: fabia_ovv7omp
 * Date: 12/16/2018
 * Time: 11:48 AM
 */

require("../../desescalator_config/secret.php");

$localAPI_KEY = $secret["apikey"];
$localAPI_SECRET_KEY = $secret["apisecretkey"];
$localACCESS_TOKEN = $secret["accesstoken"];
$localACCESS_TOKEN_SECRET = $secret["accesstokensecret"];


class Configuration
{
	/** @var string api-key */
	private $tAPI_KEY;
	/** @var string api-secret-key */
	private $tAPI_SECRET_KEY;
	/** @var string access-token */
	private $tACCESS_TOKEN;
	/** @var string access-token-secret */
	private $tACCESS_TOKEN_SECRET;
	
	public function __construct()
	{
		global $localAPI_KEY, $localAPI_SECRET_KEY, $localACCESS_TOKEN, $localACCESS_TOKEN_SECRET;
		$this->tAPI_KEY = $localAPI_KEY;
		$this->tAPI_SECRET_KEY = $localAPI_SECRET_KEY;
		$this->tACCESS_TOKEN = $localACCESS_TOKEN;
		$this->tACCESS_TOKEN_SECRET = $localACCESS_TOKEN_SECRET;
	}
	
	/**
	 * @return string
	 */
	public function getAPI_KEY(): string
	{
		return $this->tAPI_KEY;
	}
	
	/**
	 * @return string
	 */
	public function getAPI_SECRET_KEY():string
	{
		return $this->tAPI_SECRET_KEY;
	}
	
	/**
	 * @return string
	 */
	public function getACCESS_TOKEN(): string
	{
		return $this->tACCESS_TOKEN;
	}
	
	/**
	 * @return string
	 */
	public function getACCESS_TOKEN_SECRET(): string
	{
		return $this->tACCESS_TOKEN_SECRET;
	}
}