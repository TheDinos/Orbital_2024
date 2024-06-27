const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const EventEmitter = require('events');
const commandEmitter = new EventEmitter();


const app = express();

app.use('/static', express.static(path.join(__dirname, 'public'))); //express server to store static websites

const WS_CLIENT_PORT = 8999;
const HTTP_PORT = 8000;
let devices = {  //Stores array of robots and their infos 
	
	12345: {   //Robot uid
			port: 8888,	 //Port its connected to
			commandQueue:'', //Placeholder for commands from client that have not yet been sent
			connectionStatus:'Disconnected', //Connection status
			clientUid: '', //uid for client it receives and send information to
			}, 
};

process.on('uncaughtException', (error, origin) => {  //Handling exceptions
	console.log('----- Uncaught exception -----');
	console.log(error);
	console.log('----- Exception origin -----');
	console.log(origin);
	console.log('----- Status -----');
});

// Clients

//Giving a unique ID to each client connected
const addClients = (ws) =>{
	ws.uid = ws.uid || uuidv4(); 
}

//Initialise Websocket Server for Clients
const ClientWss = new WebSocket.Server({port: WS_CLIENT_PORT}, () => console.log(`Client WS Server is listening at ${WS_CLIENT_PORT}`)); 

//Handles Client Connections 
ClientWss.on('connection', ws => {  
	
	addClients(ws); 
	console.log(`Client ${ws.uid} connected.`);

	//Listener for client's commands 
	ws.on('message', data => { 

		//Processing message from clients as commands
		try {    
			data = JSON.parse(data); //Processing message event as Json data
			
			if(data.operation === 'movement') {
				console.log(data.direction);
				devices['12345'].commandQueue = data.direction; 
				commandEmitter.emit('12345');
			}
			//For extension: Add more if else loops if other commands 

		} catch (error) {
			console.log(`Error while processing client message: ${error}`);
		}
	});

	ws.on('close', () =>{
		console.log(`Client ${ws.uid} disconnected from port ${WS_CLIENT_PORT}`);
		ws.uid = null;
	});

	// Handle errors
	ws.on('error', (error) => {
		console.error('WebSocket Client error:', error);
	});

});
  
//Devices
//Iterating through robot list, key is the robotuid, device is the array containing the device info	
Object.entries(devices).forEach(([deviceUid, device]) => { 
	
	//Creating a WS server for each device
	const DeviceWss = new WebSocket.Server({port: device.port}, () => console.log(`Device WS Server is listening at ${device.port}`));
	
	DeviceWss.on('connection',(ws) => {	
		
		console.log(`Device ${deviceUid} connected on port ${device.port}`);
		device.connectionStatus = "Connected";
		
		// Event listener for new commands
    	commandEmitter.on(deviceUid, () => {
        	ws.send(device.commandQueue, (error) => {
				if (error) console.log(`Failed to send command: ${error}`);
				else device.commandQueue = null; //Consumes the command if it sends
			});
    	});
		
		//Processing messages from the device
		ws.on('message', data => { 
			
			if (ws.readyState !== ws.OPEN) return;
			console.log('some message received');	

            //Process image
			device.image = Buffer.from(Uint8Array.from(data)).toString('base64');
			
			//Broadcast to respective client

            //Broadcasts to all connected clients(change this)
			ClientWss.clients.forEach(client => {
				client.send(JSON.stringify({ image: device.image, connectionStatus: device.connectionStatus }));
			});

		});

		//Handling Disconnections
		ws.on('close', () =>{
			console.log(`Device disconnected from port ${device.port}`);
			device.connectionStatus = "Disconnected";
		});

		// Handle errors
		ws.on('error', (error) => {
			console.error('WebSocket Arduino error:', error);
		});

	});
});

app.get('/client',(_req,res)=>{ res.sendFile(path.resolve(__dirname,'./public/client.html')); });
app.listen(HTTP_PORT,()=>{ console.log(`HTTP server starting on ${HTTP_PORT}`); });