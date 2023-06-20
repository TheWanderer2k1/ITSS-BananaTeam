const express = require("express");
const router = express.Router();
const FoodController = require("./food.controller");

router.get('/foods', FoodController.getFoodDescriptionList);
router.get('/food/:foodId/review', FoodController.getReviewList);
router.post('/food/:foodId/review', FoodController.addReview);
router.put('/food/:foodId/review/:reviewId', FoodController.editReview);
router.delete('/food/:foodId/review/:reviewId', FoodController.deleteReview);
router.post('/food/:foodId/review/:reviewId/reaction', FoodController.reactReview);
router.delete('/food/:foodId/review/:reviewId/reaction', FoodController.unreactReview);


router.get('/foods/findByAddress', FoodController.getFoodByAddress);
router.get('/foods/:foodDesId', FoodController.getFoodInforById);

router.put('/foods/:foodId', FoodController.updateFoodInfor);
router.delete('/foods/:foodId', FoodController.deleteFoodInfor);


module.exports = router;
