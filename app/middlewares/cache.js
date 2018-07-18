var mcache = require('memory-cache')
var config = require('config');

module.exports.cacheapi = function(req, res, next) {
    let key = '_express_'+ req.originalUrl;
    let cachedResponse = mcache.get(key);
    if(cachedResponse){
        res.send(cachedResponse);
    }
    else
    {
        return next();
    }
}

module.exports.fillcache = function(req,data){
    let key = '_express_'+ req.originalUrl;
    let cachedResponse = mcache.get(key);
    let duration = config.get('performance.cacheduration');    
    if(!cachedResponse){
        mcache.put(key,data,duration*1000);
    }
}

module.exports.cache = mcache;