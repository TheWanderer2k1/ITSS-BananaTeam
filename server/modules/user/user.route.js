const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");

router.get('/user/:userId',UserController.getUserById)
router.get('/user/:phone/phone',UserController.getUserByPhone)
router.put('/user/:userId/point', UserController.updateUserPoint)

module.exports = router;