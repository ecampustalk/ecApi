// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var middlewares = require('./middlewares/index')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = process.env.PORT || 8181;        // set our port

var index = require('./routes/index');

app.use('/api',middlewares.auth.isAuthenticated, index);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Express is running on port ' + port);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(middlewares.handlers.page_not_found);
app.use(middlewares.handlers.page_error);
