var twilio_accountSid = 'AC4b8ab878645d75095b4de7d767226ae8'; // Your Account SID from www.twilio.com/console
var twilio_authToken = "fd12f91381ef650e6199b3b301f01877";

var twilio = require('twilio');
var twilio_client = new twilio.RestClient(accountSid, authToken);


function testMessage(mobileNumber){
    if (mobileNumber == undefined) mobileNumber = '+447850546917';

    client.messages.create({
        body: 'Aaron is texting you using node.js from HackUPC :D',
        to: mobileNumber,
        from: '+441202286170' // From a valid Twilio number
    }, function(err, message) {

    	if (err) {
    		console.log(err);
    	}else{
        	console.log(message.sid);
        }
    });
}