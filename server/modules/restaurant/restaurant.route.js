const express = require("express");
const router = express.Router();
const RestaurantController = require("./restaurant.controller");

router.get('/restaurant/:restaurantId',RestaurantController.getRestaurantInforById)
router.get('/restaurant/:restaurantId/food',RestaurantController.getMenu)
router.put('/restaurant/:restaurantId',RestaurantController.editRestaurantInfor)
module.exports = router;
