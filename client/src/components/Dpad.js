import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import {socket} from '../socket'

function Dpad() {

    const handleClick = (direction) => {
      socket.emit("RobotMove", direction);
    };


  return (
    <div className="dpad">
      <button className="up" onClick={() => handleClick('Forward')}>F</button>
      <div>
        <button className="left" style = {{marginRight:'25px'}} onClick={() => handleClick('Left')}>L</button>
        <button className="right" style = {{marginLeft:'25px'}}onClick={() => handleClick('Right')}>R</button>
      </div>
      <button className="down" onClick={() => handleClick('Backward')}>B</button>
    </div>
  );
}

export default Dpad;
