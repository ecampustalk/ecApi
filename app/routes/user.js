var express = require('express');
var router = express.Router();

var consts = require('../constants');
var handlers = require('../middlewares/req-handlers')
var cacheMiddleware = require('../middlewares/cache')
var userController = require('../controllers/user')

router.get('/',cacheMiddleware.cacheapi, function(req, res, next) {
 
    req.session.userId = '2232323';

    var response = {Apis: [
        {users: consts.getURL(req)+'/users'},
        {students: consts.getURL(req)+'/students/'+consts.port}
    ]};
    
    // cacheMiddleware.fillcache(req,response);
    res.json(response);
  });

/* GET user  details by id or by user model in body as json object*/
router.get('/user/:id', handlers.asyncHandler(userController.getUserByID));
router.post('/user', handlers.asyncHandler(userController.getUser));


// TODO : use mongoose validation to validate the input data from client
router.post('/login', handlers.asyncHandler(userController.loginUser));

module.exports = router;
