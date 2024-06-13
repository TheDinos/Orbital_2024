import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import {socket} from '../socket'

function UpDown() {
  const handleClick = (direction) => {
    socket.emit("RobotMove", {direction});
  };

    return (
    <div className="dpad">
      <button className="up" style = {{marginBottom:'30px'}}onClick={() => handleClick('Up')}>U</button>
      <button className="down" style = {{marginTop:'30px'}}onClick={() => handleClick('Down')}>D</button>
    </div>
  );
}

export default UpDown;
