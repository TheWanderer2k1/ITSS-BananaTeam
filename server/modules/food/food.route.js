const express = require("express");
const router = express.Router();
const FoodController = require("./food.controller");

router.get('/foods', FoodController.getFoodDescriptionList);

module.exports = router;