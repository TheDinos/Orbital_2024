const path = require('path');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const {verifyToken} = require('./auth'); //Importing the verify token function from auth file
const EventEmitter = require('events');
const commandEmitter = new EventEmitter();

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

// Clients
//Giving a unique ID to each client connected
const addClients = (ws) =>{
	ws.uid = ws.uid || uuidv4(); 
}
//Initialise Websocket Server for Clients
const ClientWss = new WebSocket.Server({port: WS_CLIENT_PORT}, () => console.log(`Client WS Server is listening at ${WS_CLIENT_PORT}`)); 

//Handles Client Connections 
ClientWss.on('connection', async (ws, req) => {  
	
	//Getting the token from the header protocol
	const token = req.headers['sec-websocket-protocol'];
	
	//If the client is trying to establish a connection without a token, return
	if (!token) {
		ws.close();
		return;
	  }
 
	//Verify the token
	const decodedToken = await verifyToken(token);
	if (!decodedToken) { //If there is an error verifying the token, null is returned and a connection is not established
		console.log('Token not valid');
		ws.close();
		return;
	}

	console.log('client verified');

	//Add clients, associate them with a unique ID
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

            //Broadcasts to all connected clients(change this once we can map users to appropriate robot)
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
