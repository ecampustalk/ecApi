
module.exports.isAuthenticated = function(req, res, next) {
    // do any checks you want to in here
    var token = req.headers.token; 
    var reftoken = req.headers.reftoken; 
    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (token !== '' && token !== undefined)
        return next();
  
     
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.status('401').send( {
        status: 401
      , url: req.originalUrl 
    });
  }
  