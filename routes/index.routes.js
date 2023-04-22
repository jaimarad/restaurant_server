module.exports = (app) => {
	app.use("/api/restaurants", require("./restaurants.routes"));
	app.use("/api/places", require("./places.routes"));
	app.use("/api/auth", require("./auth.routes"));
	app.use("/api/user", require("./user.routes.js"))
	app.use("/api/reviews", require("./reviews.routes.js"))
}
