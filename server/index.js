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

    socket.on("RobotMove", (direction) =>{   //"Forward, Backward, Left, Right"
        switch(direction){
            case 'Forward':
                break;
            case 'Backward':
                break;
            case 'Left':
                break;
            case 'Right':
                break;
        }
    });

    socket.on("RobotTilt", (direction) =>{  //"Up, Down"
        switch(direction){
            case 'Up':
                break;
            case 'Down':
                break;
        }
    });

})

server.listen(3001, () => {
    console.log("Server is running");
});

