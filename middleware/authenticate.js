const UserModel = require("../models/User.model.js");
const firebaseAdmin = require("../services/firebase.js");

module.exports = async function (req, res, next) {
	try {
		const firebaseToken = req.headers.authorization?.split(" ")[1];

		let firebaseUser;
		if (firebaseToken) {
			firebaseUser = await firebaseAdmin.auth.verifyIdToken(firebaseToken);
		}

		if (!firebaseUser) {
			// Unauthorized
			return res.sendStatus(401);
		}

		const user = await UserModel.findOne({
			firebaseId: firebaseUser.user_id
		});

		if (!user) {
			// Unauthorized
			return res.sendStatus(401);
		}

		req.user = user;

		next();
	} catch (err) {
		//Unauthorized
		res.sendStatus(401);
	}
}
