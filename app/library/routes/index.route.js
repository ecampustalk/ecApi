var express = require('express');
var router = express.Router();

router.use('/library', require('./library.route'));

module.exports = router;