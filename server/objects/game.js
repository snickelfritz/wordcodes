var wordData = require('../words.json');
var firebase = require('../firebase')

var CARD_TYPES = {
    RED: "red",
    BLUE: "blue",
    ASSASSIN: "assassin",
    CIVILIAN: "civilian"
};

var Game = function() {
    this.gameId = null;
    this.clueHistory = [];
    this.startingTeam = pickStartingTeam();
    this.wordList = generateWordList();
    this.assignments = generateAssignments(this.startingTeam);
};

Game.prototype.save = async function() {
    var result = null;

    if (this.gameId) {
        // Update the existing game object
    } else {
        var result = await firebase.create("games", this.toFirebaseJSON());
        this.gameId = result.key;
    }

    return this;
};

Game.prototype.toFirebaseJSON = function() {
    var firebaseJSON = {
        "startingTeam": this.startingTeam,
        "assignments": this.assignments,
        "wordList": this.wordList,
        "clueHistory": this.clueHistory
    };

    return firebaseJSON;
};

Game.prototype.toApiJSON = function(isCodeMaster) {
    var data = {
        "wordList": this.wordList,
        "clueHistory": this.clueHistory,
        "startingTeam": this.startingTeam
    };

    if (isCodeMaster) {
        for (var i = 0; i < this.wordList.length; i++) {
            var indexString = "" + i;
            var item = data.wordList[i];

            if (this.assignments.assassin === indexString) {
                item["type"] = CARD_TYPES.ASSASSIN;
            } else if (this.assignments.red[indexString]) {
                item["type"] = CARD_TYPES.RED;
            } else if (this.assignments.blue[indexString]) {
                item["type"] = CARD_TYPES.BLUE;
            } else {
                item["type"] = CARD_TYPES.CIVILIAN;
            }
        }
    }

    return data;
};

var pickStartingTeam = function() {
    if (Math.random() < 0.5) {
        return "red";
    }

    return "blue";
};

var generateAssignments = function(startingTeam) {
    var setTeamCards = function(cardObject, desiredLength) {
        while (Object.keys(cardObject).length < desiredLength) {
            var randomIndex = Math.floor(Math.random() * 25);
            if (!usedIndices[randomIndex]) {
                cardObject[randomIndex] = true;
                usedIndices[randomIndex] = true;
            }
        }
    };

    var redCards = {};
    var blueCards = {};

    var redLength = 8;
    var blueLength = 8;
    if (startingTeam === "red") {
        redLength = 9;
    } else {
        blueLength = 9;
    }

    var usedIndices = {};
    var randomIndex = Math.floor(Math.random() * 25);
    var assassinCard = randomIndex;
    usedIndices[randomIndex] = true;
    setTeamCards(redCards, redLength);
    setTeamCards(blueCards, blueLength);

    return {
        "blue": blueCards,
        "red": redCards,
        "assassin": assassinCard
    };
};

var generateWordList = function() {
    var wordList = [];

    var fullList = wordData["list_1"].concat(wordData["list_2"]);

    var usedIndices = {};
    while (Object.keys(usedIndices).length < 25) {
        var randomIndex = Math.floor(Math.random() * fullList.length);
        if (!usedIndices[randomIndex]) {
            var tuple = fullList[randomIndex];
            var randomSide = Math.floor(Math.random() * 2);

            var item = {"word": tuple[randomSide]};
            wordList.push(item);
            usedIndices[randomIndex] = true;
        }
    }

    return wordList;
};

module.exports = Game;
