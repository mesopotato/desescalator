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

exports.app  = http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connect', function (socket) {

    console.log('a user connected');
    //assemling some testdata for the unitsets
    var data = {
        contactId: 1,
        firstName: 'Jhon',
        latName: 'Doe',
        email: 'jhonDoe@email.com',
        phone: '1234'
    };
    io.emit('connected', data);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('disconnected');
    });

    socket.on('close', function (msg) {
        console.log('close function reached : ' + msg);

        var scan = false;
        var scan2 = {
            bool: 'false'
        };
        //kill.chat();
        // das eröffnet irgendwie ein weiterer thread..
        chat(msg, scan);
        console.log('terminated: ');
        io.emit('close', scan2);
    });

    socket.on('chat message', function (msg) {
        var scan = true;
        console.log('chat message reached');
        chat(msg, scan);
    });
    socket.on('wtf', function (msg) {
        console.log('WTF message reached');
    });
});


function chat (msg, scan) {
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


module.exports = app; // for testing