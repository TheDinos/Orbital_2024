import { useState, useEffect, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket'; 


const useWebSocketConnection = () => {
  const [messageHistory, setMessageHistory] = useState([]); //Stores message history (Movement Controls)
  const [deviceData, setDeviceData] = useState({}); //Stores data received from devices via websocket (Video feed)
  const [command, setCommand] = useState(null); //Used to store the last command sent over the websocket (Movement controls)

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8999/'); //Change the url 

  useEffect(() => {  //Runs when a new message is received (when lastMessage changes)
    if (lastMessage !== null) { //Checks that its a valid message
      try {
        const parsedData = JSON.parse(lastMessage.data);
        setDeviceData(parsedData.devices);
        setMessageHistory((prev) => prev.concat(lastMessage)); //concatenates lastMessage to messageHistory
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]); 

  const sendCommand = (direction) => {
    const commandMessage = JSON.stringify({
      operation: 'command',
      command: {
        message: {direction},
      },
    });
    sendMessage(commandMessage); //send the command to the Websocket
    setCommand(commandMessage);
  };

  const connectionStatus = { //Maps Websocket connection state to readable statuses
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    messageHistory,
    deviceData,
    sendCommand,
    connectionStatus,
  };
};

export default useWebSocketConnection;
