const { ADMIN } = require("../const/index.js");
const ReviewModel = require("../models/Review.model.js");

module.exports = async function (req, res, next) {
	try {
		const { review_id } = req.params
		const review = await ReviewModel.findById(review_id)
		if (req.user.role == ADMIN || req.user._id == review.owner)
			next();
		else
			throw new Error("Unauthorize")
	} catch (err) {
		//Unauthorized
		res.sendStatus(401);
	}
}
