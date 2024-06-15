import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import useWebSocketConnection from '../useWebsocket.js'

function Dpad() {

  const { deviceData, sendCommand, connectionStatus, messageHistory } = useWebSocketConnection();

  return (
    <div className="dpad">
      <button className="up" onMouseDown={() =>  sendCommand('Forward')} onMouseUp={() => sendCommand('Stop')}>F</button>
      <div>
        <button className="left" style = {{marginRight:'25px'}} onMouseDown={() => sendCommand('Left')} onMouseUp={() => sendCommand('Stop')}>L</button>
        <button className="right" style = {{marginLeft:'25px'}} onMouseDown={() => sendCommand('Right')} onMouseUp={() => sendCommand('Stop')}>R</button>
      </div>
      <button className="down" onMouseDown={() => sendCommand('Backward')} onMouseUp={() => sendCommand('Stop')}>B</button>
    </div>
  );
}

export default Dpad;
