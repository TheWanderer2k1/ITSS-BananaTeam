const express = require("express");
const router = express.Router();
const FoodController = require("./food.controller");

router.get('/foods', FoodController.getFoodDescriptionList);
router.get('/foods/findByAddress', FoodController.getFoodByAddress);
router.get('/foods/:foodDesId', FoodController.getFoodInforById);

router.put('/foods/:foodId', FoodController.updateFoodInfor);
router.delete('/foods/:foodId', FoodController.deleteFoodInfor);


module.exports = router;