const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const restaurantSchema = new Schema(
	{
		name: { type: String, required: true },
		location: {
			type: { type: String, default: "Point" },
			coordinates: { type: [Number], unique: true, required: true },

		},
		address: { type: String, required: true },
		imageUrl: { type: String },
		place_id: { type: String, required: true, unique: true }

	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`    
		timestamps: true,
		versionKey: false
	}
);
restaurantSchema.index({ location: '2dsphere' })
const Restaurant = model("restaurants", restaurantSchema);

module.exports = Restaurant;
