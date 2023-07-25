var admin = require("firebase-admin");

var serviceAccount = require("./constant/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vue-dtfood-default-rtdb.firebaseio.com",
});

module.exports.admin = admin;
