// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// import external files
var secrets = require('./secrets.js'); // import API keys etc
var appID = secrets.appID;
var secret = secrets.secret;

// "create_event" route - Bring in the app ID/secret from the Hackathon owner.
app.post('/create_event', function (req, res) {
    console.log(req.body);
    if(req.body.appID && req.body.secret && req.body.eventName){
      // we have all the stuff we need to pass to OAuth
      request('http://www.google.com', function (error, response, body) {

        // !!!! IMPORTANT

        // This snippet here currently stops the app sending a response.

        // Try sending a POST with invalid values, you should get a valid response
        // Now try sending a POST with valid stuff, Postman will tell you "Could not get any response"
        // It was at this point I decided to sleep, but this should be decent progress
        // Next step is to call:

        // GET https://my.mlh.io/api/v2/users.json?client_id=<CLIENT_ID>&secret=<SECRET>&page=1

        // to pull the data for our event. This works in Postman, but the functionality is currently broken in the app.

        // Good luck <3 - Nat

        if (!error && response.statusCode == 200) {
          req.send(body) // Show the HTML for the Google homepage.
        }
      })
    }
    else{
      res.status(400).send('Bad Request');
    }
})


//Standard entry point.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(9001, function(){
    console.log('App running on 9001');
    console.log('User Connected');
});
