<?php
/**
 * Created by PhpStorm.
 * User: Fabian Bienz
 * Date: 12/16/2018
 * Time: 9:44 PM
 */

require_once ("codebird/codebird.php");

/**
 * Class TwitterPost
 * Provides Methods for dispatching posts to Twitter
 * no Usage since switch to Node.js
 */
class TwitterPost
{
	private $config;
	private $cb;
	
	/** @var array holds error information */
	public $error;
	
	public function __construct()
	{
		$this->config = new \Configuration();
		\Codebird\Codebird::setConsumerKey($this->config->getAPI_KEY(),$this->config->getAPI_SECRET_KEY());
		$this->cb = \Codebird\Codebird::getInstance();
		$this->cb->setToken($this->config->getACCESS_TOKEN(),$this->config->getACCESS_TOKEN_SECRET());
		$this->error = array();
	}
	
	
	/**
	 * Simple post on Twitter.
	 * if return value is false check error array field
	 * @param string $message
	 * @return bool
	 */
	public function sendPost(string $message): bool
	{
		if(strlen($message)<1){
			$reply_error = array(
				'time' => date("Y-m-d H:i:s"),
				'error' => 'no message given'
			);
			$this->error[] = $reply_error;
			return false;
		}
		//other params include: lat, long...
		//API-reference: https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update
		$params = [
			'status' => $message
		];
		$reply = $this->cb->statuses_update($params);
		
		if($reply->httpstatus === '200') {
			return true;
		}
		else{
			$reply_error = array(
				'time' => date("Y-m-d H:i:s"),
				'httpstatus' => $reply->httpstatus,
				'reply' => $reply
			);
			$this->error[] = $reply_error;
			return false;
		}
	}
	
}
