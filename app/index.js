// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var session = require("express-session")
var mongoose = require('mongoose');
var MongoDBStore = require('connect-mongodb-session')(session);

//process.env.NODE_ENV = "development"; //set to production for live
var config = require('config');

var mongoStore = new MongoDBStore({
    uri: config.get('app.connectionString'),
    collection: 'Sessions'
  });

var middlewares = require('./middlewares/index');

// TODO : use session for security
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get('app.sessionSecret'),
  resave: false,
  saveUninitialized: true,
  store: mongoStore
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = config.get('app.port');        // set our port

var index = require('./routes/index');

app.use(middlewares.handlers.session_middleware);
// app.use('/api',middlewares.auth.isAuthenticated, index);
app.use('/api', index);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Express is running on port ' + port);

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

app.use(middlewares.handlers.page_not_found);
app.use(middlewares.handlers.page_error);
