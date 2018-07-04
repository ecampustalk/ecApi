// This file contains all the constants required by the express api 

module.exports.port = process.env.PORT || 8180; 
module.exports.getURL = function(req){
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}
