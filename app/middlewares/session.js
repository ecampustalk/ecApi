var session = require("express-session")
var MongoDBStore = require('connect-mongodb-session')(session);

var mongoStore = new MongoDBStore({
    uri: config.get('app.connectionString'),
    collection: 'Sessions'
  });