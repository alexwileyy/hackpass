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


// "create_event" route - Bring in the app ID/secret from the Hackathon owner.
app.post('/create_event', function (req, res) {
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
            const data = JSON.parse(body);
            console.log(data);
            //Call addUsers mongo
            db.addEvent(data);
            res.sendFile(path.join(__dirname,'create-event.html'), (err) => {
                if(err) console.log(err);
            });
        });

    }
    else{
        res.status(400).send('Bad Request');
        console.log('bad request');
    }
});

app.get('/test', function(req,res){
    res.sendFile(path.join(__dirname,'create-event.html'), (err) => {
        if(err) console.log(err);
    });
});

//Standard entry point.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(9001, function(){
    console.log('App running on 9001');
    console.log('User Connected');
});
