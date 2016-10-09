var mongoose = require('mongoose');
mongoose.connect('localhost:27017');

var Schema = mongoose.Schema;

//User Schema
var eventSchema = new Schema({
    appId: String,
    eventName: String,
    created: Date.parse(),
    attendees: Array,
});

//User Table
var eventTable = mongoose.model('Events', eventSchema);

module.exports.addEvent = (data, appID, cb) => {

    const eventData = {
        appId: appID,
        eventName: 'Hack UPC',
        created: new Date(),
        attendees: data
    };

    const newEvent = new eventTable(eventData);
    newEvent.save((err, event) => {
        if (err) {
        }
        cb(event);
    });
};

module.exports.changeEventTitle = (data, newTitle, cb) => {

    eventTable.update({_id: data}, {eventName: newTitle}, {}, function(err, result) {
      cb();
    });
};

module.exports.getEvent = function(eventId, cb) {
  eventTable.findOne({_id: eventId}, function(err, event){
      if(err) {
          console.log(err);
      }
      cb(event);
  });
};

module.exports.getEventByAppId = function(appId, cb) {
  eventTable.findOne({appId: appId}, function(err, event){
      if(err) {
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
