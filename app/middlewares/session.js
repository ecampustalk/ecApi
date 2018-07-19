var session = require("express-session")
var MongoDBStore = require('connect-mongodb-session')(session);

var config = require('config');

var mongoStore = new MongoDBStore({
    uri: config.get('app.connectionString'),
    collection: 'sessions'
  });

 module.exports.session =  session({
    secret: config.get('app.sessionSecret'),
    resave: false,
    saveUninitialized: true,
    store: mongoStore
  });