var Game = require('../objects/game');

var gameHandler = {};

gameHandler.createGameHandler = async function(req, res, next) {
    var authorId = res.locals.uid;

    var gameObj = new Game();
    gameObj.init(authorId);
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
