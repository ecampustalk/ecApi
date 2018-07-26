var express = require('express');
var router = express.Router();

var middlewares = require('../middlewares/index')
var userController = require('../controllers/user')

// get routes
router.get('/getuser/:id', middlewares.handlers.asyncHandler(userController.getUserByID));
//router.post('/getuser', middlewares.handlers.asyncHandler(userController.getUsers));

router.post('/getusers', middlewares.handlers.asyncHandler(userController.getUsers));
router.get('/getuserrole/:id', middlewares.handlers.not_implemented);
router.get('/getuserroles', middlewares.handlers.not_implemented);

// update routes
router.get('/updateusers', middlewares.handlers.not_implemented);
router.get('/updateroles', middlewares.handlers.not_implemented);

// add routes
router.get('/addusers', middlewares.handlers.not_implemented);
router.get('/addroles', middlewares.handlers.not_implemented);

// add routes
router.get('/deleteusers', middlewares.handlers.not_implemented);
router.get('/deleteroles', middlewares.handlers.not_implemented);

// custom routes
// TODO : use mongoose validation to validate the input data from client
router.post('/login', middlewares.handlers.asyncHandler(userController.loginUser));
router.post('/register', middlewares.handlers.asyncHandler(userController.registerUser));
router.post('/logout', userController.logoutUser);


module.exports = router;
