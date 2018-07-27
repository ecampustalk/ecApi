var jwt = require('jsonwebtoken');
var config = require('config');

var User = require('../models/user.model')
var queries = require('../queries/index.query')
var passphrase = config.get('security.jwt.passphrase');  

module.exports.getUserByID = async function(req,res,next) {
    try {   
        id = req.params.id;
        
        if(id == null || id == undefined)
            return res.sendStatus(400);
        
        const result = await User.findOne(queries.common.getbyid(id)).select(queries.user.getbyid_select());
        return res.json(result);        
    } catch (error) {
        next(error) 
    }    
}

module.exports.getUsers = async function(req,res,next) {
    try {  
        user = req.body;      
        const result = await User.find(user);
        return res.json(result);        
    } catch (error) {        
        next(error) 
    }    
}


// TODO : receive encrypted password for better security
// TODO : instead of hardcoded values, we need to setup db and fetch user data from there
module.exports.loginUser = async function(req,res,next) {
    try {

        if(req.session!== undefined && req.session.userinfo!==null && req.session.userinfo !==undefined)
            return res.sendStatus(200);

        userdata = req.body;   
        if(userdata == undefined || userdata == null || userdata == ''){
            return res.sendStatus(400);
        }

        const result = await User.findOne({email: userdata.email, password: userdata.password});        
        if(result !== undefined && result !== null && result !== '')
        {            
            req.session.userinfo = result;
            req.session.loggedinIP = req.ip;
            return res.sendStatus(200);
        }
        else{
            return res.sendStatus(401);
        }
                
    } catch (error) {                
        next(error) 
    }    
}

module.exports.registerUser = async function(req,res,next) {
    try {
        userdata = req.body;   
        if(userdata == undefined || userdata == null || userdata == ''){
            return res.sendStatus(400);
        }              
        
        User.findOne({email: userdata.email}, function (error, result) {
            if (error) {
              return next(error);
            } else {
              
                // check if user already exist return 409 = conflict, else create a new user        
                if(result == undefined || result == null || result == '')
                {            
                    // create new user after validation checks
                    // TODO : validation checks before registration
                    let user =  new User();
                    user.name = userdata.name;
                    user.email = userdata.email;
                    user.password = userdata.password; 
                    
                    user.save(function(err) {
                        if (err)
                            throw err;
                        // user data saved , now save session and send response
                        req.session.userinfo = user;
                        req.session.loggedinIP = req.ip;
                        return res.sendStatus(201);
                        });
                }
                else{
                    return res.sendStatus(409);
                }              
            }
          });        
                
    } catch (error) {                
        next(error) 
    }    
}


module.exports.logoutUser = function(req,res,next) {
    try {
        if (req.session.userinfo) {
            // delete session object
            req.session.destroy(function(err) {
              if(err) {
                return next(err);
              } else {
                return res.sendStatus(200);
              }
            });
          }                         
    } catch (error) {                
        next(error) 
    }    
}