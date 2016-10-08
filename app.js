var express = require('express');
var app = express();
var path = require('path');

//Standard entry point.
app.get('/', function(req, res, err){
    if(err){
      console.log(err)
    }
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(9001, function(){
    console.log('App running on 9001');
    console.log('User Connected');
});
