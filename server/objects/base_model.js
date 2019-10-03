"use strict";

const firebaseRequests = require('../firebase.js')

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
            objData = await firebaseRequests.read(firebaseTable, objId);
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
            var result = await firebaseRequests.create(firebaseTable, this.toFirebaseJSON());
            this.id = result.key;
        }

        return this;
    }
}
