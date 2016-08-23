var express = require('express');
var fs = require('fs');
var router = express.Router();
var mqtt    = require('mqtt');
var topic = 'test.topic';
var key= fs.readFileSync('./key.pem');
var cert= fs.readFileSync('./broker.pem');
var options={
  host: 'broker-amq-mqtt-ssl-amq-demo.rhel-cdk.10.1.2.2.xip.io',
  port: 443,
  key:key,
  cert:cert,
  passphrase: 'password',
  username: 'admin',
  password: 'admin',
  servername :'broker-amq-mqtt-ssl-amq-demo.rhel-cdk.10.1.2.2.xip.io',
  rejectUnauthorized: false
};
var url='mqtts://roker-amq-mqtt-ssl-amq-demo.rhel-cdk.10.1.2.2.xip.io:443';
/*
//for mqtt connection , i.e. to a standalone amq instance
var options={
  host: '192.168.223.130',
  port: 1883,
  username: 'admin',
  password: 'admin',
};
var url=null;
*/


var message='hello world!';
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
