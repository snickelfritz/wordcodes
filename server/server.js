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

var authMiddleware = async function(req, res, next) {
    const cookies = new Cookies(req.headers.cookie);
    const idToken = cookies.get('JWT');
    if (idToken) {
        const tokenData = await firebaseRequests.verifyIdToken(idToken);
        if (tokenData) {
            res.locals.uid = tokenData.uid;
            next();
        } else {
            console.log("Error--invalid JWT");
            res.redirect('/')
        }
    }
};

app.get("/api/game", authMiddleware, gameHandler.getGameHandler);
app.post("/api/game/create", authMiddleware, gameHandler.createGameHandler);

app.listen(8080);
