var twilio_accountSid = 'AC4b8ab878645d75095b4de7d767226ae8'; // Your Account SID from www.twilio.com/console
var twilio_authToken = "fd12f91381ef650e6199b3b301f01877";
var twilio_number = '+441202286170';

var twilio = require('twilio');
var twilio_client = new twilio.RestClient(twilio_accountSid, twilio_authToken);


function testMessage(mobileNumber){
    if (mobileNumber == undefined) mobileNumber = '+447850546917';

    twilio_client.messages.create({
        body: 'Aaron is texting you using node.js from HackUPC :D',
        to: mobileNumber,
        from: twilio_number // From a valid Twilio number
    }, function(err, message) {

    	if (err) {
    		console.log(err);
    	}else{
        	console.log(message.sid);
        }
    });
}

function multiMessage(jsonArray, message){

    jsonArray.forEach(function(json){
        twilio_client.messages.create({
            body: message,
            to: json.mobileNumber,
            from: twilio_number // From a valid Twilio number
        }, function(err, message) {

            if (err) {
                console.log(err);
            }else{
                console.log(message.sid);
            }
        });
    });
}

//testMessage(undefined);
/*
multiMessage(
    [
        { mobileNumber : '+447411305139' },
        { mobileNumber : '+447904681221' },
        { mobileNumber : '+447850546917'}
    ],
    "Hooray for multiple messages"
);
*/