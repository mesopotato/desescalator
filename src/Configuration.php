<?php
/**
 * Created by PhpStorm.
 * User: Fabian Bienz
 * Date: 12/16/2018
 * Time: 11:48 AM
 */

/*
require("../../desescalator_config/secret.php");

$localAPI_KEY = $secret["apikey"];
$localAPI_SECRET_KEY = $secret["apisecretkey"];
$localACCESS_TOKEN = $secret["accesstoken"];
$localACCESS_TOKEN_SECRET = $secret["accesstokensecret"];
*/
namespace Mesopotato\Desescalator;
require_once __DIR__.'/../vendor/autoload.php';
use Desescalator\Secret\Secret;

/**
 * Class Configuration
 * @package Mesopotato\Desescalator
 * Provides necessary Tokens for the Twitter API
 * no usage since switch to Node.js
 */
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
		$secret = new Secret();
		$this->tAPI_KEY = $secret::apikey;
		$this->tAPI_SECRET_KEY = $secret::apisecretkey;
		$this->tACCESS_TOKEN = $secret::accesstoken;
		$this->tACCESS_TOKEN_SECRET = $secret::accesstokensecret;
	}
	
	/**
	 * Alias "consumer key"
	 * Authenticates our Application
	 * @return string
	 */
	public function getAPI_KEY(): string
	{
		return $this->tAPI_KEY;
	}
	
	/**
	 * Alias "consumer secret"
	 * Authenticates our Application
	 * @return string
	 */
	public function getAPI_SECRET_KEY():string
	{
		return $this->tAPI_SECRET_KEY;
	}
	
	/**
	 * Used to make request on behalf of our Twitter account
	 * @return string
	 */
	public function getACCESS_TOKEN(): string
	{
		return $this->tACCESS_TOKEN;
	}
	
	/**
	 * Used to make Requests on behalf of our Twitter account
	 * @return string
	 */
	public function getACCESS_TOKEN_SECRET(): string
	{
		return $this->tACCESS_TOKEN_SECRET;
	}
}
