const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const firebaseAdmin = require("../services/firebase.js");
const UserModel = require("../models/User.model.js");
const ReviewModel = require("../models/Review.model.js");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.user._id).populate('toGo').populate('favs').select('-firebaseId ')
		const reviews = await ReviewModel.find({ owner: req.user._id }).populate('restaurant', 'name')
		user['reviews'] = reviews
		console.log({ ...user, reviews })
		res.status(200).json({ ...user._doc, reviews })
	} catch (err) {
		console.log("eror")
		next(err)
	}
});

router.post("/", async (req, res) => {
	const { email, name, password } = req.body;
	console.log(req.body)

	if (!email || !name || !password) {
		return res.status(400).json({
			error:
				"Invalid request body. Must contain email, password, and name for user."
		});
	}

	try {
		console.log("HOLA")
		const newFirebaseUser = await firebaseAdmin.auth.createUser({
			email,
			password
		});

		if (newFirebaseUser) {
			await UserModel.create({
				email,
				name,
				firebaseId: newFirebaseUser.uid
			});
		}
		return res
			.status(200)
			.json({ success: "Account created successfully. Please sign in." });
	} catch (err) {
		console.log(err)
		if (err.code === "auth/email-already-exists") {
			return res
				.status(400)
				.json({ error: "User account already exists at email address." });
		}
		return res.status(500).json({ error: "Server error. Please try again" });
	}
});


router.post("/create", async (req, res, next) => {
	try {
		const { email, uid, name } = req.body
		const user = await UserModel.findOne({ email, firebaseId: uid })
		if (!user) {
			await UserModel.create({ email, firebaseId: uid, name })
			res.sendStatus(201)
		}
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}

})

module.exports = router;
