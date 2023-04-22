const placesAxios = require("../services/placesAxios")
const Restaurant = require('../models/Restaurant.model.js');


const getDetails = async (req, res, next) => {
	try {
		const { id } = req.params
		const place = await Restaurant.findById(id)
		//.select('place_id location')
		const response = await placesAxios.findPlaceById(place.place_id);
		const photosProm = response.result.photos.map((photo) => {
			return (placesAxios.getPhoto(photo.photo_reference))
		})
		const photos = await Promise.all(photosProm)
		console.log(photos[0])
		res.json({
			number: response.result.formatted_phone_number,
			website: response.result.website,
			price_level: response.result.price_level,
			schedule: response.result.current_opening_hours.weekday_text,
			photos: response.result.photos,
			coordinates: {
				lat: place.location.coordinates[1],
				lng: place.location.coordinates[0]
			},
			name: place.name,
			address: place.address
		})

	} catch (err) {
		next(err)
	}
}

module.exports = { getDetails }