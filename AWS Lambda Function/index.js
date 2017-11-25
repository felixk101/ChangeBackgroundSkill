  const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');
var ws = require('ws')



const handlers = {

  'SetBackgroundIntent': function () {
    if (!this.event.request.intent.slots.description.value) {
      this.emit(':ask', 'Was für ein Hintergrund soll angezeigt werden?');
    } else {
      let description = this.event.request.intent.slots.description.value;
      this.emit(':tell', 'Setze Hintergrundbild auf '+this.event.request.intent.slots.description.value+'');
      var iotdata = new AWS.IotData({endpoint: 'a2nljurxozn6qg.iot.eu-west-1.amazonaws.com'});
      var params = {
        topic: 'background', /* required */
        payload: JSON.stringify({'pictureDescription':description}),
        qos: 0
      }
      iotdata.publish(params, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
          this.emit(':tell','Tut mir leid, ich konnte keine Nachricht an den I O T Broker senden.');
        }
        else     console.log(data);           // successful response
      });
      const myws = new ws('ws://185.31.162.252:3002/');


      myws.on('open', function open() {
        console.log('publishing...');
          myws.send(description);
          myws.close();
      });


    }
  }
};


exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = 'amzn1.ask.skill.35f6347c-33c6-4cd6-8801-89e8bad53dec';
  alexa.registerHandlers(handlers);
  alexa.execute();
};