import React from 'react';
import Section1 from './Section1/Section1';
import Section2 from './Section2/Section2';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SecureHomeImage from './SecureHomeImage.png';
import './AboutUs.css';

import '../Intro/Intro.css'


const PageContainer = styled(Container)({ //Container for the entire page
    background: 'linear-gradient(90deg, #12100e, #2d3436, #434343)',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
});

const Section = styled(Box)({ //Container for each section of the page
    width: '100%', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

const Image = styled('img')({ //Image has a 1:1 aspect ratio
    maxWidth: '60%', 
    height: 'auto',
    borderRadius: '20px', 
});


const theme = createTheme({
    typography: {
      fontFamily: 'Canva Sans', //Default font
      h1: { fontFamily: 'Archivo Black',},
      h2: {fontFamily: 'Canva Sans',},
      body1: {fontFamily: 'Canva Sans',},
      body2: {fontFamily: 'Poppins',},
    },
});

function AboutUs() {

    return (
    <ThemeProvider theme={theme}> {/*Elements wrapped will be able to use the predefined fonts*/}
    <PageContainer>
        {/*First Section: Quick intro*/}
        <Section>
            <Section1/>
        </Section>
        

        {/*Second Section: Benefits*/}
        <Section id="section2">
            <Section2/>
        </Section>


        {/*Third Section: Quick start*/}
        <Section id="section3" className="section3">

        {/*Header for Section 2*/}
        <Typography
        variant="h2" // Adjust variant based on your needs
        sx={{
          fontFamily: 'Arial, sans-serif',
          fontWeight: '900', // Black weight
          fontSize: '48px', // Larger font size
          color: 'rgba(255, 255, 255, 0.9)', // Standout color against dark background
        }}
      >
        <span className="purplemulticolored-text">Secure</span> your family's safety, starting today
      </Typography>


        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Image src={SecureHomeImage} alt="Robot Dog Image" />
                </Box>
            </Grid>
            
            <Grid item xs={12} md={6}> {/*Two seperate grid containers for text and Image */}
                <Box padding="150px"> {/* Moves the text closer to the centre*/}
                    <Typography variant="body1" component="div" sx={{ fontSize: '18px', textAlign: 'justify', lineHeight: 1.6 }}>
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            Basic Operation
                        </Typography>
                        <ul>      
                            <li>Ensure that your robot is turned on.</li>
                            <li>Click on the "Connect to Robot" button located on the top right of the page.</li>
                            <li>Enter the credentials of the robot and click ‘Connect’.</li>
                            <li>
                            Once successfully connected, the robot’s movement can be controlled,
                            in addition to live video feed from the mounted cameras.
                            </li>
                            <li>
                            To disconnect the robot, click on the red “Disconnect” button at the
                            top right-hand corner.
                            </li>
                        </ul>


                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            Advanced Operations
                        </Typography>
                        <ul>
                            <li>
                            Autonomous mode to automatically patrol the house at pre-set timings.
                            </li>
                            <li>
                            ‘Play’ mode which allows for dynamic human-robot interaction.
                            </li>   
                            <li>Change of robot settings from the website.</li>
                        </ul>

                    </Typography>
                </Box>
            </Grid>

        </Grid>

        </Section>
    </PageContainer>
    </ThemeProvider>
  );
}

export default AboutUs;
