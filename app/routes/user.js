var express = require('express');
var router = express.Router();

var consts = require('../constants');
var middlewares = require('../middlewares/index')
var userController = require('../controllers/user')

router.get('/',middlewares.mcache.cacheapi, function(req, res, next) {
 
    var response = {Apis: [
        {users: consts.getURL(req)+'/users'},
        {students: consts.getURL(req)+'/students/'+consts.port}
    ]};
    
    cacheMiddleware.fillcache(req,response);
    res.json(response);
  });

/* GET user  details by id or by user model in body as json object*/
router.get('/user/:id', middlewares.handlers.asyncHandler(userController.getUserByID));
router.post('/user', middlewares.handlers.asyncHandler(userController.getUser));


// TODO : use mongoose validation to validate the input data from client
router.post('/login', middlewares.handlers.asyncHandler(userController.loginUser));
router.post('/register', middlewares.handlers.asyncHandler(userController.registerUser));
router.get('/logout', middlewares.handlers.asyncHandler(userController.logoutUser));

module.exports = router;
