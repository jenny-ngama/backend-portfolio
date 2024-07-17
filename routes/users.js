const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/auth');
const ctr_adm = require('../controllers/controller_adm');

// API SERVER
router.post('/server/signup', ctr_adm.serverSignup);
router.post('/server/login', ctr_adm.serverLogin);
router.post('/server/logout', ctr_adm.serverLogout);
router.get('/server', ctr_adm.serverUsersGet);
router.get('/server/data', ctr_adm.serverUsersJson);
router.get('/server/create', ctr_adm.serverUserCreate);
router.get('/server/:requestId', ctr_adm.serverUserGet);
router.get('/server/data/:requestId', ctr_adm.serverUserGetJson);
router.put('/server/:requestId', ctr_adm.serverUserPut);
router.post('/', ctr_adm.serverUsersEmpty);

module.exports = router;
