// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// // import external files
// var secrets = require('./secrets.js'); // import API keys etc
// var appID = secrets.appID;
// var secret = secrets.secret;

//Share the public folder.
app.use(express.static('public'));

//Temp perm set for testing
const appID = '3b0f0c7b101653f2ba1cdd2aa2ed2c84a38f50875cd6fdb56c535e894b2e9b3a';
const secret = '49053d1df0add83e1085b7f19c4d1c03c216fcb9f2837e13bc65a23c359f28be';

// "create_event" route - Bring in the app ID/secret from the Hackathon owner.
app.post('/create_event', function (req, res) {
    if(req.body.appID && req.body.secret){

        //Obtain the APPID and Secret from page
        // const appID = req.body.appID;
        // const secret = req.body.secret;
        // console.log('AppID: ' + appID);
        // console.log('Secret: ' + secret);



        const options = {
            method: 'GET',
            url: `https://my.mlh.io/api/v2/users?client_id=${appID}&per_page=1000&secret=${secret}`
        };

        request(options, function(error, response, body){
           if(error){
               console.log(error)
           }
           console.log(JSON.parse(body).data[0]);
        });



        //Call addUsers mongo

    }
    else{
        res.status(400).send('Bad Request');
        console.log('bad request');
    }
});

//Standard entry point.
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.listen(9001, function(){
    console.log('App running on 9001');
    console.log('User Connected');
});
