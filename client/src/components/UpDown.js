import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import useWebSocketConnection from '../useWebsocket.js'

function UpDown() {
  const { deviceData, sendCommand, connectionStatus, messageHistory } = useWebSocketConnection();

    return (
    <div className="dpad">
      <button className="up" style = {{marginBottom:'30px'}} onMouseDown={() => sendCommand('Up')} onMouseUp={() => sendCommand('Stop')}>U</button>
      <button className="down" style = {{marginTop:'30px'}} onMouseDown={() => sendCommand('Down')} onMouseUp={() => sendCommand('Stop')}>D</button>
    </div>
  );
}

export default UpDown;
