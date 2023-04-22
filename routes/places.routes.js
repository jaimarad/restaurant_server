const { getDetails } = require('../controllers/places.controller')
const router = require("express").Router();

router.get('/detail/:id', getDetails)

module.exports = router;