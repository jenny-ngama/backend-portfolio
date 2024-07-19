const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/auth');
const ctr_projet = require('../controllers/controller_projet');

router.get('/', middlewareAuth, ctr_projet.projetsGet);

module.exports = router;