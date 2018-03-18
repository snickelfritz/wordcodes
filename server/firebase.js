var admin = require("firebase-admin");

var serviceAccount = require("./keys/admin-keys.json");
var databaseURL = "https://wordcodes-731c6.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL
});

var db = admin.database();
var auth = admin.auth();
var ref = db.ref();

var firebaseRequests = {};

firebaseRequests.create = async function(table, dataJSON) {
    var createRef = ref.child(table);
    dataJSON["createDate"] = (new Date).getTime() / 1000.0;

    var result = await createRef.push(dataJSON);

    return result;
};

firebaseRequests.read = async function(table, uid) {
    var readPath = table + "/" + uid;

    var result = await ref.child(readPath).once('value');
    return result;
};

firebaseRequests.verifyIdToken = async function(idToken) {
  return await auth.verifyIdToken(idToken);
    // .then(function(decodedToken) {
    //   console.log("Decoded token: ", decodedToken);
    //   return true;
    //   // var uid = decodedToken.uid;
    //   // ...
    // }).catch(function(error) {
    //   // Handle error
    //   // TODO
    //   console.log("Invalid token\n")
    //   return false;
    // });
}

module.exports = firebaseRequests;
