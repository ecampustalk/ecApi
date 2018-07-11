var jwt = require('jsonwebtoken');
var config = require('config');

var User = require('../models/user')
var security = require('./security')

module.exports.getUserByID = async function(req,res,next) {
    try {   
        id = req.params.id;     
        const result = await User.findOne({_id:id});
        res.json(result);        
    } catch (error) {
        next(error) 
    }    
}

module.exports.getUser = async function(req,res,next) {
    try {  
        user = req.body;      
        const result = await User.findOne(user);
        res.json(result);        
    } catch (error) {        
        next(error) 
    }    
}


// TODO : receive encrypted password for better security
// TODO : instead of hardcoded values, we need to setup db and fetch user data from there
module.exports.loginUser = async function(req,res,next) {
    try {
        user = req.body;                
        const result = { "email": "shrikantgond@gmail.com" } //await User.findOne({email: user.email, password: user.password});
        if(result !== undefined && result !== null && result !== '')
        {
            //loginToken = security.getLoginToken(result._id,result.email);
            //res.json({loginToken})
            var passphrase = config.get('security.jwt.passphrase');  
            jwt.sign(result, passphrase, function(err, token) {
                if(err !== undefined || err !== null || err !== ''){
                    res.json(token);
                }
                else{
                    res.sendStatus(401);
                }
              });
        }
        else{
            res.sendStatus(401);
        }
                
    } catch (error) {                
        next(error) 
    }    
}