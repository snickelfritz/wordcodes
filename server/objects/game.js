"use strict";

var wordData = require('../words.json')

var CARD_TYPES = {
    RED: "red",
    BLUE: "blue",
    ASSASSIN: "assassin",
    CIVILIAN: "civilian"
};

class Game extends BaseModel {
    constructor() {
        super();

        // Store the history of given clues so players can go back and see them later on.
        this.clueHistory = [];

        this.startingTeam = null;
        this.wordList = [];

        // The card assignments for each team (and for the assassin).
        this.assignments = {};

        // Player assignments for the four roles
        this.userAssignments = {
            "blueMaster": null,
            "blueGuesser": null,
            "redMaster": null,
            "redGuesser": null
        };
    }

    getFirebaseTable() {
        return "games";
    }

    init(authorId) {
        if (this.id) {
            throw new Error("Can't init already saved game")
        }

        this.startingTeam = pickStartingTeam();
        this.wordList = generateWordList();
        this.assignments = generateAssignments(this.startingTeam);

        this.assignUser(authorId);
    }

    assignUser(userId) {
        var openRoles = [];

        for (var key in this.userAssignments) {
            if (this.userAssignments[key] !== null) {
                openRoles.push(key);
            }
        }

        if (openRoles.length === 0) {
            throw new Error("Game is full.");
        }

        var randomIndex = Math.floor(Math.random() * openRoles.length);
        var userRole = openRoles[randomIndex];
        this.userAssignments[userRole] = userId;
    }

    toFirebaseJSON() {
        var firebaseJSON = {
            "startingTeam": this.startingTeam,
            "assignments": this.assignments,
            "wordList": this.wordList,
            "clueHistory": this.clueHistory,
            "userAssignments": this.userAssignments
        };

        return firebaseJSON;
    }

    toApiJSON(isCodeMaster) {
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
    }
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
