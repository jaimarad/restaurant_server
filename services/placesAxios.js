const axios = require('axios')

class PlacesAxios {
	constructor() {
		this.api = axios.create({
			baseURL: 'https://maps.googleapis.com/maps/api/place/'
		})

	}

	async findPlaceById(id) {
		const response = await this.api.get(`details/json?place_id=${id}&fields=formatted_phone_number%2Cwebsite%2Cprice_level%2Ccurrent_opening_hours%2Cphotos&language=es&key=${process.env.GOOGLE_MAPS_API_KEY}`);
		return response.data;
	}


	async getPhoto(reference) {
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: 'https://maps.googleapis.com/maps/api/place/photo?photo_reference=AUjq9jlOjgafbfeoAewWE5goUZiKpkkCKlkXWT0AlbaTCoLh77_jhqmJRJyzuUFpdrd5_mm5nrWShhQ-SjqaYRgjQo8JARxwC8KM_Es-VPd8BVbzku-mFkjbCHa_vb93pFfjsxnQpWa3EL_Xw8MxVayPAtRlwkaos9XXu10p0o38-w2jj--S&maxwidth=500&key=AIzaSyAIQkhSla3_7bDxjMflVcaQDfxQbSWCPEg',
			headers: {
				'Accept': 'image/*'
			}
		};

		axios.request(config)
			.then((response) => {
				console.log(response.data);
				console.log("success")
			})
			.catch((error) => {
				console.log(error);
				console.log("ERROR")
			});
	}



	static getInstance() {
		if (!this.instance) {
			this.instance = new PlacesAxios();
		}
		return this.instance;
	}

}

module.exports = PlacesAxios.getInstance()