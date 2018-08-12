var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// TODO : use mongoose validation to validate the input data from client
// http://mongoosejs.com/docs/validation.html

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validatePassword = function(password) {
    return password && password.length > 6;
};

var UserSchema   = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,        
        required: 'Name is required'    
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Invalid email address']
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
        validate: [validatePassword, 'Invalid password']
    }    
});


module.exports = mongoose.model('User', UserSchema);