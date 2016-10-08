var twilio_accountSid = 'AC4b8ab878645d75095b4de7d767226ae8'; // Your Account SID from www.twilio.com/console
var twilio_authToken = "fd12f91381ef650e6199b3b301f01877";
var twilio_number = '+441202286170';

var twilio = require('twilio');
var twilio_client = new twilio.RestClient(twilio_accountSid, twilio_authToken);

////////////////////////////////////////////////////////////////////////////////



module.exports.testMessage = (mobileNumber) => {
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
};

module.exports.multiMessage = (jsonArray, message) => {

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
};

module.exports.messageIncrementer = (jsonArray, message, increment) => {
    return{
        jsonArray : jsonArray,
        message : message,
        increment : increment,

        sendMessage : function(){
            if (this.jsonArray.length > this.increment) {
                module.exports.multiMessage(jsonArray.splice(0,this.increment), this.message);
                return true;
            }else{
                module.exports.multiMessage(jsonArray, this.message);
                return false;
            }
        }
    };

}

module.exports.autoMessageIncrementer = (jsonArray, message, increment, minutes) => {
   
    return{
        minutes : minutes,
        messageIncrementer : module.exports.messageIncrementer(jsonArray, message, increment),

        autoMessage : function(){
            if ( this.messageIncrementer.sendMessage() ) setInterval(autoMessage(), this.minutes * 60 * 1000);
        }
    }

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

/*
var mi = messageIncrementer(
    [
        { mobileNumber : '+447850546917' },
        { mobileNumber : '+447850546917' },
        { mobileNumber : '+447850546917'}
    ],
    "Yay incrementing",
    2
);


prompt.start();

function foodInvite(){
    console.log("Press Enter Key to invite people for food");
    prompt.get(["Press Enter"], function(err, result){
        if(mi.sendMessage())foodInvite();
    });
}

foodInvite();

*/

