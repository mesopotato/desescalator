
const express = require('express');
var app = require('express')();
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);

var Twit = require('twit');
// Making a Twit object for connection to the API 
var T = new Twit({
    consumer_key: 'L4q6pYsH68gWK48EbX08Ky9av'
    , consumer_secret: '4rjJX7RQDPY3kxgv5UkHQVI6j2K0JANBGFWBWQ1kIkpIbVbUID'
    , access_token: '928752851265970177-8FtwvdyqN0cZtNXHfQGYx1FDrZFqMP7'
    , access_token_secret: 'ife34t6LiEo8uzZx9Gb5FLTIaxdP8kvSlYOliL7J3TD6l'
})

//app.use(express.static(__dirname + '/public'));
console.log('awake and waiting :)');

app.get('/', function (req, res) {
    //res.send('<h1>Hello world</h1>');
    //refactoring route handler to use index.html instead 
    res.sendFile(__dirname + '/public/index.html');
    console.log('war in app.get');
});


http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connect', function (socket) {

    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('close', function (msg) {
        //console.log('bot is sleeping : ' + msg);
        //out = setTimeout(chat(msg), 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999);
        scan = false;
        //kill.chat();
        // das eröffnet irgendwie ein weiterer thread..
        chat(msg, scan);
        console.log('terminated: ');
    });

    socket.on('chat message', function (msg) {
        scan = true;
        console.log('chat message reached');
        chat(msg, scan);
    });
    socket.on('wtf', function(msg){
        console.log('WTF message reached');
    });

});
function chat(msg, scan) {
    console.log('message: ' + msg);
    console.log()
    //-----------------------------------------
    //var param = JSON.parse(msg);
    var phrase = msg.string;
    var regex = new RegExp(msg.string);
    var answer = msg.answer;

    //es werden suchparameter hinzugefügt und nach mehreren gesucht und herausgeschickt.. wenn nicht irendwas getan wird..
    //  if (phrase != compare){
    //     stream.stop();
    var stream = T.stream('statuses/filter', { track: phrase });
    //      phrase = msg.string;
    //}else {
    //      var stream = T.stream('statuses/filter', { track: phrase });
    //}


    if (scan) {

        console.log('scanTwitter function reached');
        //var phrase = msg;
        stream.on('tweet', gotTweet);
        function gotTweet(tweet) {
            var name = tweet.user.screen_name;

            if (regex.test(tweet.text)) {
                //   if (tweet.user.location != null){    
                var retweetedS = 'Not retweeted';
                console.log('Checkbox value : ' + msg.checkbox);
                //stream.stop();

                console.log('Msg.Answer field Check2: ' + msg.checkbox2);
                console.log('Msg.Answer field Ceck1: ' + msg.checkbox);
                console.log('------------------------------------------------------------');
                //json = JSON.stringify(tweet.text) + '\n';
                var id = tweet.id_str;
                

                if (msg.checkbox2 == 'on2') {
                    var replyText = '@' + name + ' ' + answer;

                    //retweet line when necessary
                    T.post('statuses/retweet', { id: tweet.id_str, status: replyText }, retweeted);
                    function retweeted(err) {
                        if (err) {
                            console.log("Error: " + err.message);
                        } else {
                            console.log('Replyed: ' + replyText);
                        }
                    }
                }

                // Post that tweet
                if (msg.checkbox == 'on') {
                    //setTimeout(reply(), 10000);
                    // function reply(){
                    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id, auto_populate_reply_metadata: true, possibly_sensitive: true}, tweeted);
                    console.log('checkbox is YES : ' + msg.checkbox);
                    retweetedS = 'retweeted';

                    // Make sure it worked!
                    function tweeted(err, reply) {
                        if (err) {
                            console.log(err.message);
                        } else {
                            console.log('------------------------HURRA---------------------------------');
                            console.log('Retweeted: ' + scan);
                        }
                    }
                    //  }
                }
                else {
                    console.log('checkbox is NO' + msg.checkbox);
                }
                var retweet = "retweet";
                tweet[retweet] = retweetedS;
                var reply = "reply";
                tweet[reply] = replyText;
                io.emit('chat message', tweet);
            }

        }
    } else {
        //wtf causes BAd twitter API request and fails
        stream.stop();
        console.log('scan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was false');
    }
    //-----------------------------------------
}
function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


app.get('/ajaxcall', function (req, res) {
    console.log('ajaxcall reached');
    //res.write('<table style="width:100%">')


    console.log('scanTwitter function reached');
    var phrase = 'I hate';
    var regex = /^I hate /;

    var stream = T.stream('statuses/filter', { track: phrase })
    stream.on('tweet', gotTweet);
    function gotTweet(tweet) {

        if (regex.test(tweet.text)) {
            //   if (tweet.user.location != null){    

            // res.send(' <tr> <th>'+tweet.text+'</th>  </tr>');
            //response.end();
            console.log(tweet.text);
            // console.log(tweet)
            console.log('------------------------------------------------------------');
            //res.write(' <tr> <th>' + tweet.text + '</th>  </tr>');
            //json = JSON.stringify(tweet.text) + '\n';
            // json.stream.write(res);
            //json.toStream().pipe(res);


            //retweet line when necessary
            T.post('statuses/retweet', { id: tweet.id_str }, retweeted);

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


    var data = {
        contactId: 1,
        firstName: 'Jhon',
        latName: 'Doe',
        email: 'jhonDoe@email.com',
        phone: '1234'
    };

    //res.send(data);
});

// Once every N milliseconds
//setInterval(tweeter, 60*5*1000);

function tweeter() {

    // making diffenert 
    var tweet = 'Here\'s a random number between 0 and 100: ' + Math.floor(Math.random() * 100);

    // Post that tweet!
    T.post('statuses/update', { status: tweet }, tweeted);

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

function search1() {
    T.get('search/tweets', {
        q: 'banana since:2011-07-11'
        , count: 100
    }
        , function (err, data, response) {
            console.log(data)
        });
}


