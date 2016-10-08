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

const changeEventTitle = (data) => {

    const search = {
        _id: data
    };
    eventTable.findOne(search, 'eventName', function(err, event){
        if(err){
            console.log(err);
        }
        console.log(event);
        // event.eventName = newName;
        // console.log(event.name);
        // event.save(function(err){
        //     if(err){
        //         console.log(err)
        //     }
        // });
    });
};


// var exports = module.exports = {};



