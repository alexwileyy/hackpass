var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: String,
    email: String
});

var userTable = mongoose.model('User', UserSchema);


function addUser()
var newUser = new userTable({ user: 'Zildjian', email: 'alex' });

newUser.save(function(err){
   if(err){
       console.log(err)
   }
   console.log('yay')
});
