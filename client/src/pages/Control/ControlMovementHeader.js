import React from 'react';
import { styled } from '@mui/system';

const Bar = styled('div')({
    width: '100%',  // Full width of the viewport
    height: '50px',  // Height of black bar relative to viewport
    display: 'flex',  // Use flexbox
    justifyContent: 'center',  // Center horizontally
    alignItems: 'center',  // Center vertically
    textAlign: 'center',  // Aligning text to the center
    color: '#ffffff',  // Color of text
    fontSize: '25px',  // Font size of text relative to viewport
    fontFamily: 'Canva Sans, sans-serif',
    backgroundColor: '#858896',  // Background color of the bar
});

function MovementHeader() {
    return (
        <Bar>Movement Controls</Bar>
    )
}

export default MovementHeader;
