var express = require('express');
var expressLogging = require('express-logging');
var logger = require('logops');
var path = require('path');
var Cookies = require('universal-cookie');
var firebaseRequests = require('./firebase.js');
var gameHandler = require('./handlers/game_handler.js');

var app = express();

app.use("/static", express.static(path.join(__dirname, "/../public")))

app.use(expressLogging(logger));
app.get("/", function(req, res, next) {
    var filePath = path.join(__dirname + "/../index.html");
    res.sendFile(filePath);
});

app.use(function(req, res, next) {
  const cookies = new Cookies(req.headers.cookie);
  console.log(req.headers);
  var idToken = cookies.get('JWT');
  console.log(idToken);
  if(idToken) {
    if(firebaseRequests.verifyIdToken(idToken)) {
      next();
    } else {
      console.log("Error--invalid JWT");
      res.redirect('/')
    }
  }
});

app.get("/api/game", gameHandler.getGameHandler);
app.post("/api/game/create", gameHandler.createGameHandler);

app.listen(8080);
