const router = require('express').Router();

const userSession = require('./session');

router.use('/session', userSession);


module.exports = router;