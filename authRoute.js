const express = require('express');
const router = express.Router();
const authControler = require('./authControler');
const auth = require('./middleware/auth');

router.get('/getrefreshtoken', authControler.getRefreshToken)

module.exports = router