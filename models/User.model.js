const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { ROLES, USER } = require("../const")

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			lowercase: true,
			trim: true
		},
		//password: {
		//	type: String,
		//	required: [true, 'Password is required.']
		//},
		name: { type: String },
		firebaseId: { type: String },
		toGo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurants' }],
		favs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'restaurants' }],
		role: { type: String, enum: ROLES, default: USER }
	},
	{
		timestamps: true,
		versionKey: false
	}
)

//userSchema.pre('save', function (next) {

//	const saltRounds = 10
//	const salt = bcrypt.genSaltSync(saltRounds)
//	const hashedPassword = bcrypt.hashSync(this.password, salt)
//	this.password = hashedPassword
//	next()
//})

//userSchema.methods.validatePassword = function (candidatePassword) {

//	return bcrypt.compareSync(candidatePassword, this.password)
//}

//userSchema.methods.signToken = function () {

//	const { _id, username, email, imageUrl, role, isDark } = this
//	const payload = { _id, username, email, imageUrl, role, isDark }

//	const authToken = jwt.sign(
//		payload,
//		process.env.TOKEN_SECRET,
//		{ algorithm: 'HS256', expiresIn: "12h" }
//	)
//	return authToken
//}

const UserModel = mongoose.model("users", userSchema)
module.exports = UserModel