var express = require('express');
var path = require('path');
var gameHandler = require('./handlers/game_handler');
var firebaseRequests = require('./firebase.js');
var firebase = require('firebase');
var app = express();

// app.use(function(req, res, next) {
//   var idToken = req.cookies.token;
//   if(firebaseRequests.verifyIdToken(idToken)) {
//     next();
//   } else {
//     res.redirect('/login')
//   }
// });

app.use("/static", express.static(path.join(__dirname, "/../public")))

app.get("/", function(req, res, next) {
    var filePath = path.join(__dirname + "/../index.html");
    res.sendFile(filePath);
});

app.get("/api/game", gameHandler.getGameHandler);
app.post("/api/game/create", gameHandler.createGameHandler);

app.listen(8080);
