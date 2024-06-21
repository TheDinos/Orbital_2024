import React, { useState, useRef, useEffect } from 'react';
import useWebSocketConnection from './useWebsocket';
import CircularProgress from '@mui/material/CircularProgress';

const RobotVideo = () => {
  const { deviceVideo} = useWebSocketConnection();
  const canvasRef = useRef(null); //References html canvas element
  const contextRef = useRef(null); //References 2D rendering context
  const [isLoaded, setIsLoaded] = useState(true); // Track if video has loaded


  useEffect(() => { //canvas element must be in DOM for it to be initialised
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth/2; // Set canvas width //need to set different canvas sizes depending on viewing from which device
      canvas.height = canvas.width/(4/3); // Set canvas height
      const context = canvas.getContext('2d'); // Get 2D rendering context
      contextRef.current = context; // Save context reference for future use
    }
  }, []);

  //Draws new image on the canvas when new deviceData is updated
  useEffect(() => {
    if (deviceVideo && deviceVideo.image && contextRef.current) {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${deviceVideo.image}`;

      setIsLoaded(true);
      image.onload = () => {
        //Clears previous drawing on the canvas
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        //Draws the new image onto the canvas
        contextRef.current.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [deviceVideo]);

  return (
    <div id="main-wrapper">
        {!isLoaded && (
          <CircularProgress 
            style={{ 
              position: 'absolute',
              top: '35%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)' 
            }} 
          />
        )}
        <canvas id="canvas-stream" ref={canvasRef} alt="Device Image"></canvas> 
    </div>
  );
};

export default RobotVideo;
