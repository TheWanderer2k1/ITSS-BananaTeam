const express = require("express");
const router = express.Router();
const FoodController = require("./food.controller");

router.get('/foods', FoodController.getFoodDescriptionList);
router.get('/foods/findByAddress', FoodController.getFoodByAddress);
router.get('/foods/getInforById', FoodController.getFoodInforById);
router.put('/foods/updateInfor', FoodController.updateFoodInfor);
//router.delete('/foods/deleteInfor', FoodController.deleteFood);


module.exports = router;