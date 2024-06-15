//Importing modules
const express = require('express')
const app = express();
const http = require("http")
const {Server} = require("socket.io") //destructures to directly access Server class
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("RobotStatus", () => {  //"Connected, Disconnected"

    });

    socket.on("RobotConnect", () =>{  //"Connect, Disconnect"
    
    });

    socket.on("RobotMove", (direction) =>{   //"Stop, Forward, Backward, Left, Right"
        switch(direction){
            case 'Stop':
                console.log("stop")
                break;
            case 'Forward':
                console.log("forward")
                break;
            case 'Backward':
                console.log("backward")
                break;
            case 'Left':
                console.log("left")
                break;
            case 'Right':
                console.log("right")
                break;
        }
    });

    socket.on("RobotTilt", (direction) =>{  //"Stop, Up, Down"
        switch(direction){
            case 'Stop':
                console.log('stop')
                break;
            case 'Up':
                console.log('up')
                break;
            case 'Down':
                console.log('down')
                break;
        }
    });

})

server.listen(3002, () => {
    console.log("Server is running");
});

