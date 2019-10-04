"use strict";

const express = require('express');
const expressLogging = require('express-logging');
const logger = require('logops');
const path = require('path');
const Cookies = require('universal-cookie');
const FirebaseRequests = require('./firebase.js');
const gameHandler = require('./handlers/game_handler.js');

const app = express();

app.use("/static", express.static(path.join(__dirname, "/../public")))

app.use(expressLogging(logger));

const authMiddleware = async function(req, res, next) {
    const cookies = new Cookies(req.headers.cookie);
    const idToken = cookies.get('JWT');
    if (idToken) {
        const tokenData = await FirebaseRequests.verifyIdToken(idToken);
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

app.get("/", function(req, res, next) {
    const filePath = path.join(__dirname + "/../index.html");
    res.sendFile(filePath);
});

app.listen(8080);
