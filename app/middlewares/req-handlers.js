module.exports.page_not_found = function(req, res, next){
    // the status option, or res.statusCode = 404
    // are equivalent, however with the option we
    // get the "status" local available as well
    res.status('404').send({ status: 404, url: req.url });
  }

  module.exports.page_error = function(err, req, res, next){
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.status('500').send( {
        status: err.status || 500
      , error: err.message
    });
  }

  module.exports.asyncHandler = fn => (req, res, next) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)