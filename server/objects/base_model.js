"use strict";

const FirebaseRequests = require('../firebase.js')

class BaseModel {
    constructor() {
        this.id = null;
        this.createDate = null;
    }

    static async load(objId) {
        let objData = null;
        let obj = null;

        const firebaseTable = this.getFirebaseTable();
        try {
            objData = await FirebaseRequests.read(firebaseTable, objId);
        }
        catch (error) {
            console.log(error);
            objData = null;
        }

        if (objData) {
            objData = objData.val();
            obj = new Game();

            for (key in objData) {
                obj[key] = objData[key];
            }
        }

        return obj;
    }

    async save() {
        let result = null;

        const firebaseTable = this.getFirebaseTable();
        if (this.id) {
            // Update the existing game object
        } else {
            const result = await FirebaseRequests.create(firebaseTable, this.toFirebaseJSON());
            this.id = result.key;
        }

        return this;
    }

    toFirebaseJSON() {
        let firebaseJSON = {};
        for (const [propName, value] of Object.entries(this)) {
            if (propName === "id") {
                continue;
            }

            firebaseJSON[propName] = value;
        }

        return firebaseJSON;
    }
}

module.exports = BaseModel;
