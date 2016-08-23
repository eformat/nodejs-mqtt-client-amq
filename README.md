# Sample code for nodejs mqtt client

## 1) Connect to JBoss AMQ deployed on Openshift v3 via mqtts

[deployment instructions] (https://access.redhat.com/documentation/en/red-hat-xpaas/0/red-hat-xpaas-a-mq-image/red-hat-xpaas-a-mq-image)

#### - Prepare key and cert files
Assumed you have prepared the keystore files (i.e. broker.ks) for the AMQ deployment. Extract the private keys (key.pem) and cert (cert.pem) from the broker.ks in this step:

Use 'password' for all the passwords and passphrases

- Convert to PEM file, broker.pem

```
# keytool -importkeystore -srckeystore broker.ks -destkeystore broker.p12  -srcstoretype jks  -deststoretype pkcs12

# openssl pkcs12 -in broker.p12 -out broker.pem
```

- Extract the key and cert files

```
# openssl pkey -in broker.pem -out key.pem

# openssl x509 -in broker.pem -out cert.pem
```

## 2) Preparing the app

https://www.npmjs.com/package/mqtt

`# npm install mqtt -g`

This app is based on express, remember to do a npm install to download all the dependencies for a fresh install

## 3) Running the app

```# DEBUG=mqtt-ex:* npm start``` (replace mqtt-ex with your app name)


```# curl -X GET localhost:3000/post```

#### output

```
# Debug=mqtt:* npm start

> mqtt-ex@0.0.0 start /home/wophoon/Documents/demo/ose/mqtt/mqtt-ex
> node ./bin/www

connecting...
GET /post 200 23.206 ms - 25
connected
message received :hello world!

```
