const { getReviews, deleteReview, createReview } = require("../controllers/reviews.controller");
const authenticate = require("../middleware/authenticate");
const canDelete = require("../middleware/canDelete");

const router = require("express").Router();

router.get("/:restaurant_id", getReviews);
router.post("/:restaurant_id", authenticate, createReview);
router.delete("/:review_id", authenticate, canDelete, deleteReview);

module.exports = router;