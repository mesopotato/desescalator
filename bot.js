console.log('the bot is starting');

//server 
var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(request, response){        
  console.log('anfrage kommt rein!')
  var phrase = 'I hate';
  var regex = /I hate/;

  // var phrase = '🌈';
  // var regex = /🌈/;

  // Search parameters: https://dev.twitter.com/streaming/reference/post/statuses/filter
  // Info on track: https://dev.twitter.com/streaming/overview/request-parameters#track
  var stream = T.stream('statuses/filter', { track: phrase })
  stream.on('tweet', gotTweet);
  //stream.on('tweet', );
  response.write('<table style="width:100%">')
  function gotTweet(tweet) {
    
    
    // Note that according to twitter docs: "Exact matching of phrases
    // (equivalent to quoted phrases in most search engines) is not supported."
    // So we filter ourselves here:

    if (regex.test(tweet.text)) {
    //  if (tweet.text = phrase)  {
    //console.log('Attempting to retweet ' + tweet.id_str + ": " + tweet.text);
    console.log(tweet.text);
    response.write(' <tr> <th>'+tweet.text+'</th>  </tr>');
    //response.end();
    console.log('------------------------------------------------------------')
    //console.log(tweet);

      //T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

      function retweeted(err, data, response) {
        if (err) {
          console.log("Error: " + err.message);
        } else {
          console.log('Retweeted: ' + tweet.id);
        }
      }
    }
   // response.write('</table>');
  }
  
  
}


server.listen(3000);


// Using the Twit node package
var Twit = require('twit');

// Making a Twit object for connection to the API
var T = new Twit({
    consumer_key: 'L4q6pYsH68gWK48EbX08Ky9av'
    , consumer_secret: '4rjJX7RQDPY3kxgv5UkHQVI6j2K0JANBGFWBWQ1kIkpIbVbUID'
    ,  access_token: '928752851265970177-8FtwvdyqN0cZtNXHfQGYx1FDrZFqMP7'
    , access_token_secret: 'ife34t6LiEo8uzZx9Gb5FLTIaxdP8kvSlYOliL7J3TD6l'
})
//tweeter();
//search1();

// Once every N milliseconds
//setInterval(tweeter, 60*5*1000);

// Here is the bot!
function tweeter() {

  // This is a random number bot
  var tweet = 'Here\'s a random number between 0 and 100: ' + Math.floor(Math.random()*100);

  // Post that tweet!
 // T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
      //console.log(response);
    }
  };

}


function search1(){
T.get('search/tweets', { 
      q: 'banana since:2011-07-11'
    , count: 100 }
    , function(err, data, response) {
        console.log(data)
  });
}