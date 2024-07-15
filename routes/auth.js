const express = require('express');
const router = express.Router();
const ctr_auth = require('../controllers/controller_auth');

router.get('/', ctr_auth.authLogin);

module.exports = router;