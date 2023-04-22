const { allRestaurants, oneRestaurant, createRestaurant, updateRestaurant, deleteRestaurant, handleToGo, handleFav } = require("../controllers/restaurants.controller");
const authenticate = require("../middleware/authenticate");
const { isAuthenticated } = require('../middleware/jwt.middleware')

const router = require("express").Router();

router.get("/", allRestaurants);
router.get("/:id", oneRestaurant);
router.post("/new", createRestaurant);
router.put("/:id", updateRestaurant);
router.put("/togo/:restaurantId", authenticate, handleToGo)
router.put("/fav/:restaurantId", authenticate, handleFav)
router.delete("/:id", deleteRestaurant);

module.exports = router;