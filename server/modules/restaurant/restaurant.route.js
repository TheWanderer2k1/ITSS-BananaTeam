const express = require("express");
const router = express.Router();
const RestaurantController = require("./restaurant.controller");
const { uploadFile } = require("../../middleware");

router.get('/restaurant/:restaurantId',RestaurantController.getRestaurantInforById)
router.get('/restaurant/:restaurantId/food',RestaurantController.getMenu)
router.post('/restaurant/:restaurantId/food', uploadFile([{ name: 'img', path: '/restaurant/food' }], 'array'), RestaurantController.addFood)
router.put('/restaurant/:restaurantId',uploadFile([{ name: 'img', path: '/restaurant/image' }, {name:'avatar', path:'/restaurant/avatar'}], 'fields'),RestaurantController.editRestaurantInfor)
module.exports = router;
