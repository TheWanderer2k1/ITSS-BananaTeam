const express = require("express");
const router = express.Router();
const ReviewController = require("./review.controller");

router.post('/food/:foodId/review/:reviewId/reaction',ReviewController.addReactReviewFood)
module.exports = router;
