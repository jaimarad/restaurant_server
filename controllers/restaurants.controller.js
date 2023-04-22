const Restaurant = require('../models/Restaurant.model.js');
const ReviewModel = require('../models/Review.model.js');
const UserModel = require('../models/User.model.js');
const User = require('../models/User.model.js');

const allRestaurants = async (req, res) => {
	try {
		console.log(req.user)
		const restaurants = await Restaurant.find();
		res.json(restaurants);
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const oneRestaurant = async (req, res) => {
	try {
		const restaurant = await Restaurant.findById(req.params.id);
		res.json(restaurant);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createRestaurant = async (req, res, next) => {
	try {
		const { name, address, lat, lng, imageUrl, place_id } = req.body;
		const restaurant = await Restaurant.create({ name, address, location: { coordinates: [lng, lat] }, imageUrl, place_id });
		console.log(restaurant.name, 'created')
		res.sendStatus(201);
	} catch (err) {
		next(err);
		//res.status(500).json({ message: err.message });
	}
};

const updateRestaurant = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, location } = req.body;
		await Restaurant.findByIdAndUpdate(id, { name, location });
		res.sendStatus(204);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteRestaurant = async (req, res) => {
	try {
		const { id } = req.params;
		await Promise.all([ReviewModel.deleteMany({ restaurant: id }), Restaurant.findByIdAndDelete(id), UserModel.updateMany({ $or: [{ favs: { $in: [id] } }, { toGo: { $in: [id] } }] }, { $and: [{ $pull: { toGo: id }, $pull: { favs: id } }] })])
		res.sendStatus(200);
	} catch (err) {
		console.log(err)
		res.status(500).json({ message: err.message });
	}
};

const handleToGo = async (req, res, next) => {
	try {
		const id = req.user._id
		let { action } = req.body
		action = action == 'add' ? '$addToSet' : '$pull'
		console.log(action)
		const user = await User.findByIdAndUpdate(id, { [action]: { toGo: req.params.restaurantId } })
		console.log(user)
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}
}

const handleFav = async (req, res, next) => {
	try {
		const id = req.user._id
		let { action } = req.body
		action = action == 'add' ? '$addToSet' : '$pull'
		console.log(action)
		const user = await User.findByIdAndUpdate(id, { [action]: { favs: req.params.restaurantId } })
		console.log(user)
		res.sendStatus(200)
	} catch (err) {
		next(err)
	}
}

module.exports = { allRestaurants, oneRestaurant, createRestaurant, updateRestaurant, deleteRestaurant, handleToGo, handleFav };