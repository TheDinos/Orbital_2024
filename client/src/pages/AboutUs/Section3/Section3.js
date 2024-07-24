import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import './Section3.css'
import SecureHomeImage from './images/SecureHomeImage.png'
import SecureHomeImage2 from './images/SecureHomeImage2.png'

const ImageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

const StyledImage = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    border: '15px solid #f2f1eb', // Apply border directly to the image
});

const StyledList = styled('ul')({
    paddingLeft: '20px',
    listStyleType: 'disc',
    '& li': {
      marginBottom: '8px',
      fontSize: '18px', // Adjust font size as needed
      lineHeight: '1.3',
    },
});

const WhiteBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f1eb',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
});

const WhiteBoxText = styled(Typography)({
    color: '#004aad',
    fontWeight: 'bold',
    fontSize: '45px',
});

function Section3() {
    return (
        <div maxWidth={false}  style={{display: 'flex', flexDirection: 'column'}}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h1" component="h1" style={{fontWeight: 'bold', fontSize: '65px'}}>
            <span className='purplemulticolored-text'>Secure</span> your family's safety, starting today
          </Typography>
        </Box>
        
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}  sx={{transform: 'translateX(-60px)'}}>
            <Box display="flex" flexDirection='column' flexbasis='40%'  padding='20px'>
                <WhiteBox>
                    <WhiteBoxText variant="h2" component="h2">
                        Start your journey here...
                    </WhiteBoxText>
                </WhiteBox>
                <StyledList>
                    <li>Turn on your robot.</li>
                    <li>Navigate to the Login page by clicking on the "Connect to Robot" button.</li>
                    <li>Enter the credentials of the robot and click ‘Connect’.</li>
                    <li>Control the robot’s movements and view the live video feed upon successful connection.</li>
                    <li>Click on the red “Disconnect” button to disconnect from the robot.</li>
                </StyledList>
            </Box>
            <ImageContainer flexbasis='60%' marginLeft='200px'style={{transform: 'rotate(3deg)'}}>
                <StyledImage src={SecureHomeImage} alt="SecureHomeImage" style={{width: '20vw', height: 'auto'}}/>
            </ImageContainer>
        </Box>
       
        
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} marginTop='-60px' mb={4}  sx={{transform: 'translateX(-30px)'}}>
            
            <ImageContainer flexbasis='60%' marginRight='100px'>
                <StyledImage src={SecureHomeImage2} alt="SecureHomeImage2" style={{marginLeft: '100px', width: '30vw', height: 'auto'}}/>
            </ImageContainer>
            
            <Box display="flex" flexDirection='column' flexbasis='40%' padding='20px' marginLeft='10px' marginTop='80px'>
                <WhiteBox>  
                    <WhiteBoxText variant="h2" component="h2">
                        Ready for more?
                    </WhiteBoxText>
                </WhiteBox>  
                <StyledList>
                    <li>Set the robot to automatically patrol the house at specific timings.</li>
                    <li>Enable ‘Play’ mode which allows for dynamic human-robot interaction.</li>
                    <li>Adjust the robot settings according to your needs.</li>
                </StyledList>
            </Box>
            
        </Box>        
      </div>
    );
  }
  
  export default Section3;
  