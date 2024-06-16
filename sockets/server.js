const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public'))); //express server to store static websites

let clients = []; //Array of connected Websocket Clients

const HTTP_PORT = 8000;
let devices = {  //store info for devices connecting to the server
	relay_module1: { port: 8888 }, 
};

process.on('uncaughtException', (error, origin) => {  //Handling exceptions
	console.log('----- Uncaught exception -----');
	console.log(error);
	console.log('----- Exception origin -----');
	console.log(origin);
	console.log('----- Status -----');
});

// Clients
const wss = new WebSocket.Server({port: '8999'}, () => console.log(`WS Server is listening at 3001`)); //Initialise Websocket server

wss.on('connection', ws => {  //Listener for connection events, which trigger each time a client connects.
	console.log('client connected');
	ws.on('message', data => { //Listener for message event
		console.log('message');
		if (ws.readyState !== ws.OPEN) return; //If connection is open, websocket object is added to client array
		clients.push(ws);
		/*clients.forEach((client, index) => {
			console.log(`Client ${index + 1}: ${client._socket.remoteAddress}:${client._socket.remotePort}`);
		});*/

		console.log('clients pushed');
		try {    //Processing message event as Json data
			data = JSON.parse(data);
			if(data.operation === 'command') {
				/*if(devices[data.command.recipient]) {
					devices[data.command.recipient].command = data.command.message.key + '=' + data.command.message.value;
					console.log('added');
				}*/
				devices['relay_module1'].command = data.command.message.direction;
				//console.log(devices['relay_module1'].command);
			}
		} catch (error) {}
	});
});


// Devices
Object.entries(devices).forEach(([key]) => {  //Iterating through list of devices connected
	const device = devices[key];
	
	new WebSocket.Server({port: device.port}, () => console.log(`WS Server is listening at ${device.port}`)).on('connection',(ws) => {
		console.log("device connected");

		ws.on('message', data => {
			console.log('some message received');
			if (ws.readyState !== ws.OPEN) return;
			console.log('device is ready');
            //If data requested by client is a command, enter this, the command was processed earlier
			
			if (device.command) {  //Sends commands to device
				console.log('command sent')
				ws.send(device.command);
				console.log(device.command);
				device.command = null; // Clears commands after sending it
			}

            //If data request by client is an object(image data), process images
		/*	if (typeof data === 'object') { 
				console.log('converting image');
				device.image = Buffer.from(Uint8Array.from(data)).toString('base64');
			} else {  //not sure if the below part is needed
				device.peripherals = data.split(",").reduce((acc, item) => {
					const key = item.split("=")[0];
					const value = item.split("=")[1];
					acc[key] = value;
					return acc;
				}, {});
			}*/

            //Broadcasts to all connected clients(change this)
			/*clients.forEach(client => {
				console.log(device.image);
				console.log(`Client: ${client._socket.remoteAddress}:${client._socket.remotePort}`);
				client.send(JSON.stringify({ image: device.image }));
			});*/
		});
	});
});

app.get('/client',(_req,res)=>{ res.sendFile(path.resolve(__dirname,'./public/client.html')); });
app.listen(HTTP_PORT,()=>{ console.log(`HTTP server starting on ${HTTP_PORT}`); });