var express = require('express');
var router = express.Router();

var consts = require('../constants');

/* GET books listing. */
router.get('/', function(req, res) {
    res.json({Apis: [
        {users: consts.getURL(req)+'/library'},
        {students: consts.getURL(req)+'/user'}
    ]});  
});

router.use('/user', require('./user'));

module.exports = router;