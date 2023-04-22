const admin = require("firebase-admin");

const serviceAccount = require("../restaurantes-31842-firebase-adminsdk-q0k92-da4782fcda.json")

const firebase = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

module.exports = {
	auth: firebase.auth()
};
