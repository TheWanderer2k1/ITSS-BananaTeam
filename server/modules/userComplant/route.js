const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/user/complain',controller.createUserComplain);
router.get('/user/complain',controller.getListRequest);
router.put('/user/complain/:id',controller.updateRequest);
router.get('/user/complain/:id', controller.getComplainById);
router.post('/user/complain/reply/:id', controller.addReply);
module.exports = router;