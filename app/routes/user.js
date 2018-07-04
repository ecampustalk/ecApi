var express = require('express');
var router = express.Router();

var consts = require('../constants');

router.get('/', function(req, res, next) {
    res.json({Apis: [
          {users: consts.getURL(req)+'/users'},
          {students: consts.getURL(req)+'/students/'+consts.port}
      ]});
  });

/* GET books listing. */
router.get('/users', function(req, res, next) {
  res.json({books: [
        {name: 'Applied Science 1'},
        {name: 'Applied Science 2'}
    ]});
});

router.route('/login')
// create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var name = req.body.email;
        var password = req.body.password;

        // call login function and get response token
        res.json({
            token : '123456'
        })
    });

module.exports = router;
