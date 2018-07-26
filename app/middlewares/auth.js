var jwt = require('jsonwebtoken');

var config = require('config');

module.exports.isAuthenticated = function(req, res, next) {
    
    
    // 1. check if the url is public
    var publicApis = config.get('security.publicApis');
    var isPublicApi = publicApis.indexOf(req.originalUrl);
    if(isPublicApi!==-1)
    {
        return next();
    }
    
    // do any checks you want to in here
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE publicApis
    // you can do this however you want with whatever variables you set up     
        
    if ((req.session!== undefined && req.session.userinfo !== '' && req.session.userinfo !== undefined && req.session.userinfo != null))
    {
        return next();
    }
    else{
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.sendStatus('401');
    }    

  }
  