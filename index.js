const express = require('express');
var app = express();
var http = require('http').Server(app);
module.exports = true;

var io = require('socket.io')(http);

var Twit = require('twit');
// Making a Twit object for connection to the API 
// this should be in a config file...
var T = new Twit({
    consumer_key: '9ReuXYRYMnbvBptUs0KpXLuNZ'
    , consumer_secret: 'jtm1Po9oWj02GTlE6QmEUAq0kZgKsHb0uhuuzjgdweoAvjfMj6'
    , access_token: '928752851265970177-MXBaqHohhFShNkr91QWt8X02hTpOeBb'
    , access_token_secret: 'fcFapsREGGMLQQDpnqVd8ELNEQ1Rf9iwZVZJEAGcJeSXL'
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
            console.log('close function reached : ' + msg);

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
        socket.on('wtf', function (msg) {
            console.log('WTF message reached');
        });

    });

function chat(msg, scan) {
    console.log('Message kommt rein: ' + msg.string);
    console.log('Actual value of the scan BOOLEAN: ' + scan);
    //-----------------------------------------
    //var param = JSON.parse(msg);
    var phrase = msg.string;
    var regex = new RegExp(msg.string);
    var answer = msg.answer;

    // var scan = this.scan;
    //es werden suchparameter hinzugefügt und nach mehreren gesucht und herausgeschickt.. wenn nicht irendwas getan wird..
    //  if (phrase != compare){
    //     stream.stop();

    var stream = T.stream('statuses/filter', { track: phrase });
    //      phrase = msg.string;
    //}else {
    //      var stream = T.stream('statuses/filter', { track: phrase });
    //}
    //if (scan) {
    console.log('scanTwitter function reached');
    //var phrase = msg;
    if (scan) {

        //stream.stop();

        console.log('!!!!API SCHICKT TWEET!!!!');
        stream.on('tweet', gotTweet);
        function gotTweet(tweet) {
            var name = tweet.user.screen_name;

            if (regex.test(tweet.text) && scan == true) {
                //   if (tweet.user.location != null){    
                var retweetedS = 'Not retweeted';
                if (msg.string == 'close') {
                    console.log('stream wurde gestoppt');
                    stream.stop();
                }
                console.log('Scan must be TRUE :' + scan);
                console.log(tweet.text);

                console.log('Msg. reply field Check2: ' + msg.checkbox2);
                console.log('Msg. retweet field Ceck1: ' + msg.checkbox);

                //json = JSON.stringify(tweet.text) + '\n';
                var id = tweet.id_str;

                if (msg.checkbox == 'on' || msg.checkbox2 == 'on2') {
                    var replyText = '@' + name + ' ' + answer;
                } else {
                    var replyText = 'Nothing..';
                }

                if (msg.checkbox == 'on' && name != "UsrWenger") {
                    retweetedS = 'retweeted';
                    //retweet line when necessary

                    T.post('statuses/retweet', { id: tweet.id_str, status: replyText }, retweeted);
                    function retweeted(err) {
                        if (err) {
                            console.log("Error: " + err.message);
                        } else {
                            console.log('Retweeted: '
                                + replyText);

                        }
                    }
                } else {
                    console.log('Not retweeted ' + + msg.checkbox)
                }

                // Post that tweet
                if (msg.checkbox2 == 'on2' && name != "UsrWenger") {
                    //setTimeout(reply(), 10000);
                    // function reply(){
                    T.post('statuses/update', { status: replyText, in_reply_to_status_id: id, auto_populate_reply_metadata: true, possibly_sensitive: true }, tweeted);
                    console.log('checkbox is YES : ' + msg.checkbox2);


                    // Make sure it worked!
                    function tweeted(err, reply) {
                        if (err) {
                            console.log(err.message);
                        } else {

                            console.log('Replyed: ' + replyText);
                            console.log('------------------------HURRA---------------------------------');
                        }
                    }
                    //  }
                }
                else {
                    console.log('Not replyed :' + msg.checkbox2);

                }
                var retweet = "retweet";
                tweet[retweet] = retweetedS;
                var reply = "reply";
                if (msg.checkbox2 == 'on2') {
                    tweet[reply] = replyText;
                } else {
                    tweet[reply] = 'Nothing';
                }
                if (name != "UsrWenger") {
                    io.emit('chat message', tweet);
                    console.log('emitted to client');
                    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
                }
            } else {
                console.log('Rgex OR--------SCAN WAS: ' + scan);
            }
        }
    } else {
        console.log('hure');
        console.log('Scan is false and stream is stopped:' + scan + ' -----------------------------')
        stream.stop();
    }


}

//} else {
//wtf causes BAd twitter API request and fails
// stream.stop();
//console.log('scan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was falsescan was false');
//}
//-----------------------------------------
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

module.exports = app; // for testing