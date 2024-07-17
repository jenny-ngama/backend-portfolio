const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/auth');
const ctr_dashboard = require('../controllers/controller_dashboard');

router.get('/',middlewareAuth, ctr_dashboard.dashboard);

module.exports = router;