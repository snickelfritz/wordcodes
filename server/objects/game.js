"use strict";

const wordData = require('../words.json')
const BaseModel = require('../objects/base_model')

const CARD_TYPES = {
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
        let openRoles = [];

        for (let key in this.userAssignments) {
            if (this.userAssignments[key] !== null) {
                openRoles.push(key);
            }
        }

        if (openRoles.length === 0) {
            throw new Error("Game is full.");
        }

        const randomIndex = Math.floor(Math.random() * openRoles.length);
        const userRole = openRoles[randomIndex];
        this.userAssignments[userRole] = userId;
    }

    toFirebaseJSON() {
        const firebaseJSON = {
            "startingTeam": this.startingTeam,
            "assignments": this.assignments,
            "wordList": this.wordList,
            "clueHistory": this.clueHistory,
            "userAssignments": this.userAssignments
        };

        return firebaseJSON;
    }

    toApiJSON(isCodeMaster) {
        let data = {
            "wordList": this.wordList,
            "clueHistory": this.clueHistory,
            "startingTeam": this.startingTeam
        };

        if (isCodeMaster) {
            for (let i = 0; i < this.wordList.length; i++) {
                const indexString = "" + i;
                let item = data.wordList[i];

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
    let setTeamCards = function(cardObject, desiredLength) {
        while (Object.keys(cardObject).length < desiredLength) {
            const randomIndex = Math.floor(Math.random() * 25);
            if (!usedIndices[randomIndex]) {
                cardObject[randomIndex] = true;
                usedIndices[randomIndex] = true;
            }
        }
    };

    let redCards = {};
    let blueCards = {};

    let redLength = 8;
    let blueLength = 8;
    if (startingTeam === "red") {
        redLength = 9;
    } else {
        blueLength = 9;
    }

    let usedIndices = {};
    const randomIndex = Math.floor(Math.random() * 25);
    const assassinCard = randomIndex;
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
    let wordList = [];

    const fullList = wordData["list_1"].concat(wordData["list_2"]);

    let usedIndices = {};
    while (Object.keys(usedIndices).length < 25) {
        const randomIndex = Math.floor(Math.random() * fullList.length);
        if (!usedIndices[randomIndex]) {
            const tuple = fullList[randomIndex];
            const randomSide = Math.floor(Math.random() * 2);

            const item = {"word": tuple[randomSide]};
            wordList.push(item);
            usedIndices[randomIndex] = true;
        }
    }

    return wordList;
};

module.exports = Game;
