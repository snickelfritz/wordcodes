var express = require('express');
var path = require('path');
var gameHandler = require('./handlers/game_handler');
var app = express();

app.use("/static", express.static(path.join(__dirname, "/../public")))

app.get("/", function(req, res, next) {
    var filePath = path.join(__dirname + "/../index.html");
    res.sendFile(filePath);
});

app.post("/api/game/create", gameHandler.createGameHandler);

app.listen(8080);
