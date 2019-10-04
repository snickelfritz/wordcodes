"use strict";

const admin = require("firebase-admin");

const serviceAccount = require("./keys/admin-keys.json");
const databaseURL = "https://wordcodes-731c6.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

const db = admin.database();
const auth = admin.auth();
const ref = db.ref();

class FirebaseRequests {
    static async create(table, dataJSON) {
        const createRef = ref.child(table);
        dataJSON["createDate"] = (new Date).getTime() / 1000.0;

        const result = await createRef.push(dataJSON);

        return result;
    }

    static async read(table, uid) {
        const readPath = table + "/" + uid;

        const result = await ref.child(readPath).once('value');
        return result;
    }

    static async verifyIdToken(idToken) {
        const tokenData = await auth.verifyIdToken(idToken);
        return tokenData;
    }
}

module.exports = FirebaseRequests;
