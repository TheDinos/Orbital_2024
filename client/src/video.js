import React, { useRef, useEffect } from 'react';
import useWebSocketConnection from './useWebsocket';

const DeviceDashboard = () => {
  const { deviceData, connectionStatus } = useWebSocketConnection();
  const videoRef = useRef(null);
  const mediaSourceRef = useRef(null); //MediaSource object used to create video stream for a media element
  const sourceBufferRef = useRef(null); //Used to append media segments to the media source


  //Initialise mediaSource and sourceBuffer 
  useEffect(() => {
    mediaSourceRef.current = new MediaSource();
    //Sets video element's source to a URL which plays Mediasource
    videoRef.current.src = URL.createObjectURL(mediaSourceRef.current);

    //When the sourceopen event starts, it indicates that the mediaSource is ready to accept data
    mediaSourceRef.current.addEventListener('sourceopen', () => {
      sourceBufferRef.current = mediaSourceRef.current.addSourceBuffer('video/webm; codecs="vp8, vorbis"');
    });
  }, []); //Runs only once because of empty dependency array

  useEffect(() => {
    if (deviceData && deviceData.videoData && sourceBufferRef.current && !sourceBufferRef.current.updating && mediaSourceRef.current.readyState === 'open') {
      sourceBufferRef.current.appendBuffer(new Uint8Array(deviceData.videoData));
    }
  }, [deviceData]);

  return (
    <div id="main-wrapper">
        <div className="connection-status">WebSocket Connection Status: {connectionStatus}</div>
        <video id="device-video" ref={videoRef} controls autoPlay></video>
    </div>
  );
};

export default DeviceDashboard;
