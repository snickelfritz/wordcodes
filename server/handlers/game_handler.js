const Game = require('../objects/game');

class GameHandler {
    static async createGameHandler(req, res, next) {
        const authorId = res.locals.uid;

        let gameObj = new Game();
        gameObj.init(authorId);
        gameObj = await gameObj.save();

        const isCodeMaster = true;
        res.send(gameObj.toApiJSON(isCodeMaster));
    }

    static async getGameHandler(req, res, next) {
        const gameId = req.query.gameId
        const gameObj = await Game.load(gameId);
        if (!gameObj) {
            // return an error about invalid game id
        }

        const isCodeMaster = true;
        res.send(gameObj.toApiJSON(isCodeMaster));
    }
}

module.exports = GameHandler;
