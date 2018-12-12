<?php
/**
 * Created by PhpStorm.
 * User: fabia_ovv7omp
 * Date: 12/5/2018
 * Time: 1:39 PM
 */
<?php
session_start();
require 'secret.php'; //??

use Abraham\TwitterOAuth\TwitterOAuth; //?? kommt das einfach woher??

define('CONSUMER_KEY', 'L4q6pYsH68gWK48EbX08Ky9av'); // add consumer key 
define('CONSUMER_SECRET', '4rjJX7RQDPY3kxgv5UkHQVI6j2K0JANBGFWBWQ1kIkpIbVbUID'); // add consumer secret 
define('OAUTH_CALLBACK', 'http://localhost/desescalator2/callback.php'); //  app callback URL 


if (!isset($_SESSION['access_token'])) {
    
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
	$request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));
	$_SESSION['oauth_token'] = $request_token['oauth_token'];
	$_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];
	$url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));
	
    echo $url; // oder header oder sonzt was 
    
} else { // 
    
	$access_token = $_SESSION['access_token'];
	$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);
	$user = $connection->get("account/verify_credentials");
	echo $user->screen_name;
}

header("Location: public_html"); //wohin stellt sich heraus 
