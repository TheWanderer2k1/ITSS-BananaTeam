const express = require("express");
const router = express.Router();
const ReviewController = require("./review.controller");

router.get('/foods/getReviewById',ReviewController.getReviewById)