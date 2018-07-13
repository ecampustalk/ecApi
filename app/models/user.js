var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// TODO : use mongoose validation to validate the input data from client
// http://mongoosejs.com/docs/validation.html

var UserSchema   = new Schema({
    name: String
});


module.exports = mongoose.model('User', UserSchema);