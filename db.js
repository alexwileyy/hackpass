var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var Schema = mongoose.Schema;

//User Schema
var eventSchema = new Schema({
    eventName: String,
    created: Date.parse(),
    attendees: Array,
});

//User Table
var eventTable = mongoose.model('Events', eventSchema);

module.exports.addEvent = (data, cb) => {

    const eventData = {
        eventName: 'Hack Pass',
        created: new Date(),
        attendees: data
    };

    const newEvent = new eventTable(eventData);
    newEvent.save((err, event) => {
        if (err) {
            console.log(event.id);
        }
        cb(event);
    });
};

const changeEventTitle = (data, cb) => {

    const search = {
        _id: data
    };

    eventTable.update(search, {eventName: data}, {}, function(err, result) {
      cb();
    });
};

module.exports.getEvent = function(eventId, cb) {
  eventTable.findOne({_id: eventId}, function(err, event){
      if(err){
          console.log(err);
      }
      cb(event);
  });
};

module.exports.getUser = function(userId, cb) {
  eventTable.findOne({'attendees': {$elemMatch: {id: userId}}}, function(err, user){
      if(err){
          console.log(err);
      }
      cb(user);
  });
};

// var exports = module.exports = {};
