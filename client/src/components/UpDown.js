import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import {socket} from '../socket'

function UpDown() {
  const handleClick = (direction) => {
    socket.emit("RobotTilt", direction);
  };

    return (
    <div className="dpad">
      <button className="up" style = {{marginBottom:'30px'}} onMouseDown={() => handleClick('Up')} onMouseUp={() => handleClick('Stop')}>U</button>
      <button className="down" style = {{marginTop:'30px'}} onMouseDown={() => handleClick('Down')} onMouseUp={() => handleClick('Stop')}>D</button>
    </div>
  );
}

export default UpDown;
