import { useState, useEffect} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket'; 


const useWebSocketConnection = () => {
  const [deviceVideo, setDeviceVideo] = useState({}); //Stores data received from devices via websocket (Video feed)
  const [deviceStatus, setDeviceStatus] = useState("Disconnected");

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8999/'); //Change the url 

  useEffect(() => {  //Runs when a new message is received (when lastMessage changes)
    if (lastMessage !== null) { //Checks that its a valid message
      try {
        const parsedData = JSON.parse(lastMessage.data);         
        setDeviceVideo(parsedData.image);
        setDeviceStatus(parsedData.connectionStatus)
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    }
  }, [lastMessage]); 

  const sendCommand = (mdirection) => { //Process commands to send to Websocket
    const commandMessage = JSON.stringify({
      operation: 'movement',
      direction: mdirection,
    });
    sendMessage(commandMessage); 
  };

  const clientStatus = { //Maps Websocket connection state to readable statuses
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return {
    deviceVideo,
    sendCommand,
    clientStatus,
    deviceStatus,
  };
};

export default useWebSocketConnection;
