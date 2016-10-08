var express = require('express');
var app = express();

//Standard entry point.
app.get('/', function(req, res, err){
    if(err){
      console.log(err);
    }
    res.send('Hello')
});

app.listen(8000, function(){
    console.log('User Connected')
});
