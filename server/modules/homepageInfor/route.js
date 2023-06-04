const express = require('express');
const router = express.Router();
const controller = require('./controller');
router.get('/api/v1/home',controller.getDataHomepage);
module.exports = router;
