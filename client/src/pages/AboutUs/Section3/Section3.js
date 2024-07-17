import React from 'react';
import {Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import './Section3.css'
import SecureHomeImage from './images/SecureHomeImage.png'
import SecureHomeImage2 from './images/SecureHomeImage2.png'



const ImageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '15px solid #f2f1eb',
    overflow: 'hidden',  // Hides any overflow beyond the container
    '& img': {
        objectFit: 'cover',  // Maintains aspect ratio and covers the container
    },
  });

const StyledList = styled('ul')({
    paddingLeft: '20px',
    listStyleType: 'disc',
    '& li': {
      marginBottom: '8px',
      fontSize: '22px', // Adjust font size as needed
      lineHeight: '1.3',
    },
});

function Section3() {
    return (
        <Container maxWidth={false}  style={{display: 'flex', flexDirection: 'column'}}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h1" component="h1" style={{fontWeight: 'bold'}}>
            <span className='purplemulticolored-text'>Secure</span> your family's safety, starting today
          </Typography>
        </Box>
        
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            <Box display="flex" flexDirection='column' flexbasis='40%'  padding='20px'>
                <Typography variant="h2" component="h2" mb={2}>
                    Start your journey here...
                </Typography>
                <StyledList>
                    <li>Turn on your robot.</li>
                    <li>Navigate to the Login page by clicking on the "Connect to Robot" button.</li>
                    <li>Enter the credentials of the robot and click ‘Connect’.</li>
                    <li>Control the robot’s movements and view the live video feed upon successful connection.</li>
                    <li>Click on the red “Disconnect” button to disconnect from the robot.</li>
                </StyledList>
            </Box>
            <ImageContainer flexbasis='60%' marginLeft='200px'style={{transform: 'rotate(3deg)'}}>
                <img src={SecureHomeImage} alt="SecureHomeImage" style={{width: '20vw', height: 'auto'}}/>
            </ImageContainer>
        </Box>
       
        
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} marginTop='-60px' mb={4} >
            
            <ImageContainer flexbasis='60%' marginRight='100px'>
                <img src={SecureHomeImage2} alt="SecureHomeImage2" style={{width: '30vw', height: 'auto'}}/>
            </ImageContainer>
            
            <Box display="flex" flexDirection='column' flexbasis='40%' padding='20px' marginLeft='50px' marginTop='80px'>
                <Typography variant="h2" component="h2" mb={2}>
                    Ready for more ???
                </Typography>
                <StyledList>
                    <li>Set the robot to automatically patrol the house at specific timings.</li>
                    <li>Enable ‘Play’ mode which allows for dynamic human-robot interaction.</li>
                    <li>Adjust the robot settings according to your needs.</li>
                </StyledList>
            </Box>
            
        </Box>        
      </Container>
    );
  }
  
  export default Section3;
  