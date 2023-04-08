const router = require('express').Router()

const session = require('../../controller/session_controller');

router.post('/add-session', session.fnAddSession)
router.get('/get-session', session.fnGetSession)
router.post('/update-session', session.fnUpdateSession)
module.exports = router;
