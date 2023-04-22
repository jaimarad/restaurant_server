const ReviewModel = require("../models/Review.model")

const getReviews = async (req, res, next) => {
	try {
		const { restaurant_id } = req.params
		const reviews = await ReviewModel.find({ restaurant: restaurant_id }).populate('owner')
		res.status(200).json({ reviews })
	} catch (err) {
		next(err)
	}
}

const createReview = async (req, res, next) => {
	try {
		const { restaurant_id } = req.params
		const { text, rating } = req.body
		await ReviewModel.create({ owner: req.user._id, restaurant: restaurant_id, text, rating })
		console.log("review created")
		res.sendStatus(201)
	} catch (err) {
		next(err)
	}
}

const deleteReview = async (req, res, next) => {
	try {
		const { review_id } = req.params
		await ReviewModel.findByIdAndDelete(review_id)
		res.sendStatus(204)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	createReview,
	getReviews,
	deleteReview
}