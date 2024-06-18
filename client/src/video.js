import React, { useRef, useEffect } from 'react';
import useWebSocketConnection from './useWebsocket';

const DeviceDashboard = () => {
  const { deviceData, connectionStatus } = useWebSocketConnection();
  const canvasRef = useRef(null); //References html canvas element
  const contextRef = useRef(null); //References 2D rendering context

  useEffect(() => { //canvas element must be in DOM for it to be initialised
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 640; // Set canvas width
      canvas.height = 480; // Set canvas height
      const context = canvas.getContext('2d'); // Get 2D rendering context
      contextRef.current = context; // Save context reference for future use
    }
  }, []);

  //Draws new image on the canvas when new deviceData is updated
  useEffect(() => {
    if (deviceData && deviceData.image && contextRef.current) {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${deviceData.image}`;

      image.onload = () => {
        //Clears previous drawing on the canvas
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        //Draws the new image onto the canvas
        contextRef.current.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [deviceData]);

  return (
    <div id="main-wrapper">
        <div className="connection-status">WebSocket Connection Status: {connectionStatus}</div>
        <canvas id="canvas-stream" ref={canvasRef} alt="Device Image"></canvas> 
    </div>
  );
};

export default DeviceDashboard;
