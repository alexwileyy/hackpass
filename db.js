var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var Schema = mongoose.Schema;

//User Schema
var eventSchema = new Schema({
    eventName: String,
    createdOn: Date,

});

//User Table
var eventTable = mongoose.model('Events', eventSchema);

function addUser(data){

    userTable.collection.insertMany(data, function(err, r){
       console.log(r + ' record added');
    });
}

addUser(data);
