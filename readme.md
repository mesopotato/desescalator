# Desescalator #
[![Build Status](https://travis-ci.com/mesopotato/desescalator.svg?branch=master)](https://travis-ci.com/mesopotato/desescalator)
[![codecov](https://codecov.io/gh/mesopotato/desescalator/branch/master/graph/badge.svg)](https://codecov.io/gh/mesopotato/desescalator)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
---
A JavaScript implementation by using Twitter API, nodeJS, socket.io and more :)
---
To start: download [nodeJS](https://nodejs.org/en/)

then open a terminal such as powershell in the repository in which the index.js file is

then run "node index.js" --> on the console should appear something

currently it is listening on port 3000

so put [localhost:3000](http://localhost:3000) in the url-bar of your browser

**the app is not a toy, it replyes to real people so queries have to be made with care**

when feeding more queries while running the app the Twit.stream just adds keywords into the requests instead of replacing/updating the stream 

according to the [twitter developer documentation](https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data.html#) a strem connection has to be closed 

according to the [twit node package developers](https://github.com/ttezel/twit#tstreampath-params) the stream can be closed with .stop() and the API does not throw an error. however the stream remains open and firering. 

on [github](https://github.com/desmondmorris/node-twitter/issues/129) they closed the issue with .destroy() which is not a defined function 

[API reference page](https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/connecting) 

on the [twittercommunity.com](https://twittercommunity.com/t/how-to-stop-streaming/6035) page is a sad chat where everybody has the same problem

twitter restricts the app when too much queries are made so i made a new app "desescalator2"

---
[Documents](https://drive.google.com/open?id=1Jv7LSfT_MDGi3HYUMKRcH5u5S9tPgUTS)

[Rollen](https://docs.google.com/document/d/17g6ulZsMIqNvBnC-qucA-jeRMrgcY7waidRa3mth2Q4/edit?usp=sharing)

[UseCase Beschreibung](https://docs.google.com/document/d/1oz9qOeU4OIjTCA6z2dbuM8Hj8swJ7ajjOvCC6fgAboM/edit?usp=sharing)

[UseCase Diagramm](https://drive.google.com/file/d/12pSeUfSbhQNWHmQcqW2j2ku75_hxw0Ws/view?usp=sharing)

[Twitter App Account](https://twitter.com/UsrWenger)

[Travis CI](https://travis-ci.com/mesopotato/desescalator)

[Code Coverage](https://codecov.io/gh/mesopotato/desescalator)

[Eslint Report](https://github.com/mesopotato/desescalator/blob/master/eslint-report.html)

[Sprint Planning](https://drive.google.com/open?id=1I7S88FCw0pv7PVFz4RMY2pTlQ7vsZWbX)

[Meetings Protokolle](https://docs.google.com/document/d/14qLnfL7dBMn7mCEZjK3b1hxpyWvRV3EUCzV04RINJ6s/edit?usp=sharing)

[Trello](https://trello.com/b/G4dGdBl8/desescalator)


---
Formated eslint output:

```shell  
 $ .\node_modules\.bin\eslint .\** -o ./eslint-report.html -f html  
```
