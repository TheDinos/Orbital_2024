import { useState, useEffect} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket'; 
import {auth} from '../firebaseAuth/FirebaseConfig';

const useWebSocketConnection = () => {
  const [deviceVideo, setDeviceVideo] = useState({}); //Stores data received from devices via websocket (Video feed)
  const [deviceStatus, setDeviceStatus] = useState("Disconnected");

  const [socketUrl, setSocketUrl] = useState(null);
  const [protocols, setProtocols] = useState([]); //Use of protocols ensure id token is encrpyted during transmission

  useEffect(() => {
    (async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const idToken = await user.getIdToken();
          setProtocols([idToken]);
          setSocketUrl('ws://localhost:8999'); // Secure WebSocket URL
        } else {
          console.error('No user is signed in.');
        }
      } catch (error) {
        console.error('Error fetching Firebase ID token:', error);
      }
    })();
  }, []);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    protocols,
    onOpen: () => console.log('WebSocket connection opened'),
    onClose: () => console.log('WebSocket connection closed'),
    onError: (event) => console.error('WebSocket error', event),
  });
  

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
