import React from 'react';
import './Dpad.css'; // Import CSS file for styling
import useWebSocketConnection from './UseWebsocket.js'


function Dpad() { //dpad design taken from: https://codepen.io/tswone/pen/GLzZLd

  const {sendCommand} = useWebSocketConnection();

  return (
    <div class="set">
      <nav class="d-pad">
        <button class="up" onMouseDown={() =>  sendCommand('Forward')} onMouseUp={() => sendCommand('Stop')}/>
        <button class="right" onMouseDown={() => sendCommand('Right')} onMouseUp={() => sendCommand('Stop')}/>
        <button class="down" onMouseDown={() => sendCommand('Backward')} onMouseUp={() => sendCommand('Stop')}/>
        <button class="left" onMouseDown={() => sendCommand('Left')} onMouseUp={() => sendCommand('Stop')} />
      </nav>
    </div> 
  );
}

export default Dpad;
