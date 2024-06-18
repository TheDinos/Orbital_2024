const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'public'))); //express server to store static websites

const HTTP_PORT = 8000;
let devices = {  //Stores array of robots and their infos 
	robot1: { port: 8888,
			uid: 12345,
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
	function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
	if(ws.uid == null){
		ws.uid = s4() + s4() + '-' + s4();
	}
}

//Initialise Websocket server
const wss = new WebSocket.Server({port: '8999'}, () => console.log(`WS Server is listening at 3001`)); 

//Listener for connection events, which trigger each time a client connects.
wss.on('connection', ws => {  
	
	addClients(ws); //Give new clients unique id's
	wss.clients.forEach((client) => {
		console.log(`Client uid: ${client.uid}`);
	});

	ws.on('message', data => { //Listener for message event
		console.log('message');
		if (ws.readyState !== ws.OPEN) return; //If connection is open, websocket object is added to client array
		
		try {    //Processing message event as Json data
			data = JSON.parse(data);
			
			if(data.operation === 'command') {
				devices['robot1'].command = data.command.direction;
			}

			if(data.operation === 'status') {
				devices['robot1'].command = 'status';
			}

		} catch (error) {}
	});
});


// Devices
Object.entries(devices).forEach(([key]) => {  //Iterating through robot list
	const device = devices[key];
	
	//Creating a WS server for each device
	new WebSocket.Server({port: device.port}, () => console.log(`WS Server is listening at ${device.port}`)).on('connection',(ws) => {	
		
		console.log("device connected");

		//Processing messages from the device
		ws.on('message', data => { 
			console.log('some message received');
			if (ws.readyState !== ws.OPEN) return;
			console.log('device is ready');
            
			//Sending command to device
			if (device.command) {  //Sends commands to device
				ws.send(device.command);
				console.log(device.command);
				device.command = null; // Clears commands after sending it
			}

			//Sending device status to client
	

            //Process image
			device.image = Buffer.from(Uint8Array.from(data)).toString('base64');

            //Broadcasts to all connected clients(change this)
			wss.clients.forEach(client => {
				//console.log(device.image);
				//Send Image over as a JSON string
				client.send(JSON.stringify({ image: device.image }));
			});
		});
	});
});

app.get('/client',(_req,res)=>{ res.sendFile(path.resolve(__dirname,'./public/client.html')); });
app.listen(HTTP_PORT,()=>{ console.log(`HTTP server starting on ${HTTP_PORT}`); });