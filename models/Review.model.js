const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const reviewSchema = new Schema(
	{
		restaurant: { type: Schema.Types.ObjectId, ref: 'restaurants' },
		owner: { type: Schema.Types.ObjectId, ref: 'users' },
		text: { type: String },
		rating: { type: Number, min: 0, max: 5 },
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`    
		timestamps: true,
		versionKey: false
	}
);
const ReviewModel = model("reviews", reviewSchema);

module.exports = ReviewModel;
