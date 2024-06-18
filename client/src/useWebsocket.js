import { useState, useEffect} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket'; 


const useWebSocketConnection = () => {
  const [deviceData, setDeviceData] = useState({}); //Stores data received from devices via websocket (Video feed)

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8999/'); //Change the url 

  useEffect(() => {  //Runs when a new message is received (when lastMessage changes)
    if (lastMessage !== null) { //Checks that its a valid message
      try {
        const parsedData = JSON.parse(lastMessage.data);
        setDeviceData(parsedData);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]); 

  const sendCommand = (direction) => { //Process commands to send to Websocket
    const commandMessage = JSON.stringify({
      operation: 'command',
      command: {direction}
    });
    sendMessage(commandMessage); 
  };


  const connectionStatus = { //Maps Websocket connection state to readable statuses
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    deviceData,
    sendCommand,
    connectionStatus,
  };
};

export default useWebSocketConnection;
