var Game = require('../objects/game');
var firebase = require('../firebase');

var createGameHandler = async function(req, res, next) {
    var gameObj = new Game();
    gameObj = await gameObj.save();

    var isCodeMaster = true;
    res.send(gameObj.toApiJSON(isMaster));
};

module.exports = {
    createGameHandler: createGameHandler
};
