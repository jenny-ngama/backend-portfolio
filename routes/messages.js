const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/auth');
const ctr_message = require('../controllers/controller_message');

router.post('/receive', ctr_message.messageReceive);
router.get('/', middlewareAuth, ctr_message.messagesGet);
router.put('/', middlewareAuth, ctr_message.messagesPut);
router.get('/data', middlewareAuth, ctr_message.messagesData);
router.get('/:id', middlewareAuth, ctr_message.messageGet);

module.exports = router;

