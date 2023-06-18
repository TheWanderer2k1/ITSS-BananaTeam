const express = require("express");
const router = express.Router();
const RestaurantController = require("./restaurant.controller");

router.get('/restaurant',RestaurantController.getRestaurantInforById)
module.exports = router;
