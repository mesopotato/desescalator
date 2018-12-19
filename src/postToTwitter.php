<?php
/**
 * Created by PhpStorm.
 * User: fabia_ovv7omp
 * Date: 12/5/2018
 * Time: 2:25 PM
 */
 $post = $_POST['comment'];

require_once ("config.php");
require_once ("codebird/codebird.php");

\Codebird\Codebird::setConsumerKey($API_KEY,$API_SECRET_KEY);

$cd = \Codebird\Codebird::getInstance();

$cd->setToken($ACCESS_TOKEN,$ACCESS_TOKEN_SECRET);

$reply = $cd->statuses_update("status=$post");

header('Location: ../public_html/index.php');

//echo $reply;
