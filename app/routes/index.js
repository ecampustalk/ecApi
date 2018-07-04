var express = require('express');
var router = express.Router();

var consts = require('../constants');
var auth = require('../middlewares/auth')

/* GET books listing. */
router.get('/',auth.isAuthenticated, function(req, res) {
    res.json({Apis: [
        {users: consts.getURL(req)+'/library'},
        {students: consts.getURL(req)+'/user'}
    ]});  
});

router.use('/user',auth.isAuthenticated, require('./user'));

module.exports = router;