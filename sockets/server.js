const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public'))); //express server to store static websites

const WS_CLIENT_PORT = 8999;
const HTTP_PORT = 8000;
let devices = {  //Stores array of robots and their infos 
	robot1: { port: 8888,
			uid: 12345, 
			commandQueue:[],
			statusQueue:[],
			connectionStatus:'Disconnected',
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

//Handles Client Connections (Listener)
ClientWss.on('connection', ws => {  
	
	addClients(ws); //Give new clients unique id's
	/*ClientWss.clients.forEach((client) => {
		console.log(`Client uid: ${client.uid}`);
	});*/

	ws.on('message', data => { //Listener for message event
		console.log('data from client');
		if (ws.readyState !== ws.OPEN) return; 	

		try {    //Processing message event as Json data
			data = JSON.parse(data);
			
			if(data.operation === 'movement') {
				console.log(data.direction);
				devices['robot1'].commandQueue.push(data.direction);
			}
			else if(data.operation === 'status') {
				devices['robot1'].commandQueue.push('status');
			}

		} catch (error) {}
		devices['robot1'].commandQueue.forEach((command, index) => {
			console.log(`Command ${index + 1}: ${command}`);
		  });
	});
});


//Queuing and sending commands sent from the client to the device (Happens asynchronously)
const processCommandQueue = async (device, ws) => {
	while (device.commandQueue.length > 0 && ws.readyState === WebSocket.OPEN) {
	  const command = device.commandQueue.shift();
	  try {
		await sendCommand(ws, command);
		console.log(`Command sent to device: ${command}`);
	  } catch (error) {
		console.error('Failed to send command:', error);
		// Requeue the command if sending failed
		device.commandQueue.unshift(command);
		break;
	  }
	}
  };
  
// Helper function to send command and await acknowledgment
const sendCommand = (ws, command) => {
return new Promise((resolve, reject) => {
	ws.send(command, (error) => {
	if (error) {
		reject(error);
	} else {
		resolve();
	}
	});
});
};



// Devices
Object.entries(devices).forEach(([key, device]) => {  //Iterating through robot list
	//const device = devices[key];
	
	//Creating a WS server for each device
	const DeviceWss = new WebSocket.Server({port: device.port}, () => console.log(`Device WS Server is listening at ${device.port}`));
	
	DeviceWss.on('connection',(ws) => {	
		
		console.log(`Device connected on port ${device.port}`);
		device.connectionStatus = "Connected";
		processCommandQueue(device, ws); //Processes command queue

		//Processing messages from the device
		ws.on('message', data => { 
			
			if (ws.readyState !== ws.OPEN) return;
			console.log('some message received');	

            //Process image
			device.image = Buffer.from(Uint8Array.from(data)).toString('base64');

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


	});
});

app.get('/client',(_req,res)=>{ res.sendFile(path.resolve(__dirname,'./public/client.html')); });
app.listen(HTTP_PORT,()=>{ console.log(`HTTP server starting on ${HTTP_PORT}`); });