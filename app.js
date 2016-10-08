// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Imported internal files.
const db = require('./db.js');

// import external files
var secrets = require('./secrets.js'); // import API keys etc
var appID = secrets.appID;
var secret = secrets.secret;

//Share the public folder.
app.use(express.static('public'));

//Standard entry point.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

//Follows the home page when a valid APP ID and SECRET code have been entered.
app.get('/event', function(req, res){
    res.sendFile(path.join(__dirname + '/create-event.html'), (err) =>{
        if(err){
            console.log(err)
        }
    })
});

app.get('/profile', (req, res) => {
    res.sendFile(__dirname + '/organiser.html', (err) => {
        if(err) console.log(err)
    });
});

app.get('/profile/:id', (req, res) => {
    //Mongo to fetch single user.
});


// "create_event" route - Bring in the app ID/secret from the Hackathon owner.
app.post('/create_event', (req, res) => {
    if(req.body.appID && req.body.secret){
        //Obtain the AppID and Secret from page
        const appID = req.body.appID;
        const secret = req.body.secret;
        const options = {
            method: 'GET',
            url: `https://my.mlh.io/api/v2/users?client_id=${appID}&per_page=1000&secret=${secret}`
        };

        request(options, function(error, response, body){
           if(error){
               console.log(error)
           }
           //Convert to JSON
           //  const data = JSON.parse(body).data[0];
            const data = JSON.parse(body).data;
            //Call addUsers mongo
            db.addEvent(data, function(event){
                const id = String(event._id);
                res.redirect('event/?event_id=' + id);
            });
        });

    }
    else{
        res.status(400).send('Bad Request');
        console.log('bad request');
    }
});

app.listen(9001, function(){
    console.log('App running on 9001');
    console.log('User Connected');
});
