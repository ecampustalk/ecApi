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
    var token = req.headers.token;  
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE publicApis
    // you can do this however you want with whatever variables you set up    
    var passphrase = config.get('security.jwt.passphrase');  
        
    if ((token !== '' && token !== undefined && token != null))
    {
        jwt.verify(token,passphrase, function(err, data) {
            
            if(err == undefined || err == null || err == ''){
                //console.log(decoded);
                // TODO : compare user details 
                if(data.session!==req.session.id){
                    return next();
                }
                else{
                    res.status('401').send( {
                        status: 401
                    , url: req.originalUrl 
                    });
                }
            }
            else{
                res.status('401').send( {
                    status: 401
                , url: req.originalUrl 
                });
            }
          });
    }
    else{
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.status('401').send( {
            status: 401
        , url: req.originalUrl 
        });
    }    

  }
  