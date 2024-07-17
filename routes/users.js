const express = require('express');
const router = express.Router();
const middlewareAuth = require('../middleware/auth');
const ctr_adm = require('../controllers/controller_adm');

// API SERVER
router.post('/server/signup', middlewareAuth, ctr_adm.serverSignup);
router.post('/server/login', ctr_adm.serverLogin);
router.post('/server/logout', middlewareAuth, ctr_adm.serverLogout);
router.get('/server', middlewareAuth, ctr_adm.serverUsersGet);
router.get('/server/data', middlewareAuth, ctr_adm.serverUsersJson);
router.get('/server/create', middlewareAuth, ctr_adm.serverUserCreate);
router.get('/server/:requestId', middlewareAuth, ctr_adm.serverUserGet);
router.get('/server/data/:requestId', middlewareAuth, ctr_adm.serverUserGetJson);
router.put('/server/:requestId', middlewareAuth, ctr_adm.serverUserPut);
router.post('/', middlewareAuth, ctr_adm.serverUsersEmpty);

module.exports = router;
