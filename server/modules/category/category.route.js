const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");
router.get('/categories',CategoryController.getCategories)
module.exports = router;