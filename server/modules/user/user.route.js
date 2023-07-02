const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");

router.post('/user/:userId',UserController.getUserById)
router.post('/user/:phone/phone',UserController.getUserByPhone)

module.exports = router;