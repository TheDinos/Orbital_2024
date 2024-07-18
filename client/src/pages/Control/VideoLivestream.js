import React, {useRef, useEffect } from 'react';
import useWebSocketConnection from '../../components/UseWebsocket';

const RobotVideo = () => {
  const {deviceVideo} = useWebSocketConnection();
  const canvasRef = useRef(null); //References html canvas element
  const contextRef = useRef(null); //References 2D rendering context

  useEffect(() => { //canvas element must be in DOM for it to be initialised
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.height = window.innerHeight/(1.9

      ); //Set canvas height
      canvas.width = (canvas.height)*(4/3); // Set canvas width //need to set different canvas sizes depending on viewing from which device
      
      const context = canvas.getContext('2d'); // Get 2D rendering context
      contextRef.current = context; // Save context reference for future use
    }
  }, []);

  //Draws new image on the canvas when new deviceVideo is updated
  useEffect(() => {
    if (deviceVideo && contextRef.current) {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${deviceVideo}`;

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
        <canvas id="canvas-stream" ref={canvasRef} alt="Device Image" style={{ border: '12px solid #f2f1eb', borderRadius: '8px', marginBottom: '15px'}}></canvas> 
    </div>
  );
};

export default RobotVideo;
