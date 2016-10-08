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

module.exports.addEvent = function(data) {

    const eventData = {
        eventName: 'Hack Pass',
        created: new Date(),
        attendees: data
    };

    const newEvent = new eventTable(eventData);
    newEvent.save((err) => {
        if (err) {
            console.log(err)
        }
    })
};



// var exports = module.exports = {};



