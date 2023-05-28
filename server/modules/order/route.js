const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/api/listOrderByUser/:userId',controller.getOrderListByUserId);
module.exports = router;