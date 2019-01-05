# Desescalator #
[![Build Status](https://travis-ci.com/mesopotato/desescalator.svg?branch=master)](https://travis-ci.com/mesopotato/desescalator)
---
A PHP and JavaScript implementation by using Twitter API, nodeJS, socket.io and more :)
---
To start: download [nodeJS](https://nodejs.org/en/)

then open a terminal such as powershell in the repository in which the index.js file is

then run "node index.js" --> on the console should appear something

currently it is listening on port 3000

so put [localhost:3000](http://localhost:3000) in the url-bar of your browser

**the app is not a toy, it replyes to real people so queries have to be made with care**

also is the app currenty **crashing** when trying to stop() a Twit.stream (after a user hits the "End" button)
and when feeding more queries while running the app the Twit.stream just adds keywords into the requests instead of replacing/updating the stream

furthermore too many replyes had ben made by the app during testing-phase so htat **twitter restricted the desescalator** currently to ReadOnly access until further notice or actions form our site 
---

[Documents](https://drive.google.com/open?id=1Jv7LSfT_MDGi3HYUMKRcH5u5S9tPgUTS)

[Rollen](https://docs.google.com/document/d/17g6ulZsMIqNvBnC-qucA-jeRMrgcY7waidRa3mth2Q4/edit?usp=sharing)

[UseCase Beschreibung](https://docs.google.com/document/d/1oz9qOeU4OIjTCA6z2dbuM8Hj8swJ7ajjOvCC6fgAboM/edit?usp=sharing)

[UseCase Diagramm](https://drive.google.com/file/d/12pSeUfSbhQNWHmQcqW2j2ku75_hxw0Ws/view?usp=sharing)

