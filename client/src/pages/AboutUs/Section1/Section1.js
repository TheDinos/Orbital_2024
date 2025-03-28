import React from 'react';
import {Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import Section1TextBG from './images/Section1TextBG.png';
import RobotDogImage from './images/RobotDogImage.png'


const ContentContainer = styled(Box)({
    backgroundImage: `url(${Section1TextBG})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '30px', //All four sides
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '500px', //Otherwise width takes the width of the container
    height: '350px',
    marginLeft: '80px',
    display: 'flex', //This and the following aligns the content in the center
    flexDirection: 'column',
    justifyContent: 'center',
  });

const ImageContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100vh',
    maxHeight: '100vh', // Ensure it doesn't exceed viewport height
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
});

const StyledImage = styled('img')({
    maxHeight: '100%',
    objectFit: 'contain',
    position: 'absolute',
    left: '-180px', // Adjust this value to move the image to the left
});

function Section1() {

    return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
    {/* Grid item for the text */}
        <Grid item xs={12} sm={5} md={5}  >
        <ContentContainer>
            <Typography variant="h1" component="h1" gutterBottom style={{ fontSize: '60px', marginBottom: '50px'}}>
                Robotic Home Monitoring
            </Typography>
            <Typography variant="body1" component='p' style={{ fontSize: '20px' }}>
                Your one stop solution for safe, secure and affordable home security. The leading choice for families.
            </Typography>
        </ContentContainer>
        </Grid>

        <Grid item xs={12} sm={7} md={7} >
            <ImageContainer>
                <StyledImage src={RobotDogImage} alt="Robotic Home Monitoring"/>
            </ImageContainer>
        </Grid>
    </Grid>
    );
  }
  
  export default Section1;
  