import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import {socket} from '../socket'

function Dpad() {
 
    const handleClick = (direction) => {
      socket.emit("RobotMove", direction);
    };

  return (
    <div className="dpad">
      <button className="up" onMouseDown={() => handleClick('Forward')} onMouseUp={() => handleClick('Stop')}>F</button>
      <div>
        <button className="left" style = {{marginRight:'25px'}} onMouseDown={() => handleClick('Left')} onMouseUp={() => handleClick('Stop')}>L</button>
        <button className="right" style = {{marginLeft:'25px'}} onMouseDown={() => handleClick('Right')} onMouseUp={() => handleClick('Stop')}>R</button>
      </div>
      <button className="down" onMouseDown={() => handleClick('Backward')} onMouseUp={() => handleClick('Stop')}>B</button>
    </div>
  );
}

export default Dpad;
