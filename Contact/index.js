const secrets = require("./secrets.js")

// set up channel to send notofications
const SLACK_WEBHOOK_CONTACT = secrets.SLACK_WEBHOOK_CONTACT
const contactChannel = require('slack-notify')(SLACK_WEBHOOK_CONTACT)

const PostToSlack = function(context, req){

    return new Promise((resolve, reject)=>{
        const message_to_admin = req.body.name + " says: " + req.body.comment + ". Please respond back at " + req.body.email

        contactChannel.send({
                channel: 'contact',
                icon_emoji: ':computer:',
                text: message_to_admin
            }, function (err) {
            if (err) {
                reject('API error:', err);
            } else {
                resolve('Message received!');
            }
        })
    })

}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (req.body && req.body.name && req.body.email && req.body.comment ) {
        try{
            await PostToSlack(context, req);
            context.res = {
                status: 200,
                body: "Message posted."
            };
        }
        catch(e){
            context.res = {
                status: 500,
                body: "Unable to post to Slack. Error Message: " + e
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass correct variables in the request body"
        };
    }
};
