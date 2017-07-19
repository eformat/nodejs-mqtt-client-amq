var express = require('express');
var fs = require('fs');
var router = express.Router();
var mqtt    = require('mqtt');
var topic = 'test.topic';
var key= fs.readFileSync('./key.pem');
var cert= fs.readFileSync('./broker.pem');
var baseURL="broker-amq-mqtt-ssl-amq.cloudapps-ocp35-wohshon.ddns.net";
var options={
  host: baseURL,
  port: 443,
  key:key,
  cert:cert,
  passphrase: 'password',
  username: 'admin',
  password: 'admin',
  servername : baseURL,
  rejectUnauthorized: false
};
var url='mqtts://'+baseURL+':443';

var message='hello world!';

//curl 192.168.223.130:3000/mqtt/sendMessage?msg=1234

router.get('/sendMessage', function(req, res, next) {
  //mqtt.connect(url,options);
  console.log('connecting...');
  var client=mqtt.connect(url,options);
  
  if (req.query.msg!=null) {
    message=req.query.msg;
  }
  client.on('connect', () => {
     console.log('connected');
     client.subscribe(topic);
     console.log('subscribed to topic '+topic);
     // Inform controllers that garage is connected
     client.publish(topic, message);
     console.log(message+' sent to  '+topic);

  });

//not going to receive
/*client.on('message', (topic, message) => {
  console.log('message received :'+message);
  if(this.topic === topic) {
    connected = (this.message.toString() === message);
    }
  });*/
  client.unsubscribe(topic);
  //client.end();
  res.send('Message Sent');

});//
  

/* GET users listing. */
router.get('/', function(req, res, next) {
  //mqtt.connect(url,options);
  console.log('connecting...');
  var client=mqtt.connect(url,options);
  client.on('connect', () => {
  console.log('connected');
  client.subscribe(topic);
  // Inform controllers that garage is connected
  client.publish(topic, message);
});

client.on('message', (topic, message) => {
  console.log('message received :'+message);
  if(this.topic === topic) {
    connected = (this.message.toString() === message);
  }
});

  res.send('MQTT connection tested ok');

});

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.send('POST: respond with a resource');
});

module.exports = router;
