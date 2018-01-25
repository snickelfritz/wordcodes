var Game = require('../objects/game');
var firebase = require('../firebase');

var gameHandler = {};

gameHandler.createGameHandler = async function(req, res, next) {
    var gameObj = new Game();
    gameObj.init();
    gameObj = await gameObj.save();

    var isCodeMaster = true;
    res.send(gameObj.toApiJSON(isCodeMaster));
};

gameHandler.getGameHandler = async function(req, res, next) {
    var gameId = req.query.gameId
    var gameObj = await Game.load(gameId);
    if (!gameObj) {
        // return an error about invalid game id
    }

    var isCodeMaster = true;
    res.send(gameObj.toApiJSON(isCodeMaster));
};

module.exports = gameHandler;
