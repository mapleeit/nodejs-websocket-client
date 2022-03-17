#!/usr/bin/env node
const WebSocketClient = require('websocket').client;

// *** 1. Create the actual message that will be transferred *** 
const request = {
    execEndpoint: '/foo',
    data: {
        docs: [{
            text: 'hello'
        }]
    }
}


// *** 2. Create Websocket Client *** 
const client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.error('Connect Failed: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendMessage() {
        if (connection.connected) {
            connection.send(JSON.stringify(request))
        }
    }
    // *** 3. Send the actual message *** 
    sendMessage();
});

client.connect('ws://localhost:12345/');
