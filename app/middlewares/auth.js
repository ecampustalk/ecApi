var config = require('config');

module.exports.isAuthenticated = function(req, res, next) {
    // do any checks you want to in here
    var token = req.headers.token; 
    var reftoken = req.headers.reftoken; 
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE publicApis
    // you can do this however you want with whatever variables you set up
    var publicApis = config.get('security.publicApis');
    var isPublicApi = publicApis.indexOf(req.originalUrl);
    if ((token !== '' && token !== undefined) || isPublicApi !== -1)
        return next();
  
     
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.status('401').send( {
        status: 401
      , url: req.originalUrl 
    });
  }
  