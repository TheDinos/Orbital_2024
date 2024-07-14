import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import RobotDogImage from './RobotDogImage.png';
import SecureHomeImage from './SecureHomeImage.png';
import './AboutUs.css';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import '../Intro/Intro.css'
import CCTVImage from './images/CCTVImage.jpg';
import ComImage from './images/ComImage.jpg';
import RDImage from './images/RDImage.jpg';
import LCImage from './images/LCImage.jpg';

const PageContainer = styled(Container)({ //Container for the entire page
  backgroundColor: 'black',
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
    padding: '20px',
  });

const Image = styled('img')({ //Image has a 1:1 aspect ratio
  maxWidth: '60%', 
  height: 'auto',
  borderRadius: '20px', 
});

const CustomCard = styled(Card)({
    minWidth: 350,
    maxWidth: 350,
    minHeight: 350,
    maxheight: 350,
    margin: '20px',
    textAlign: 'justify',
});

const Media = styled(CardMedia)({
    height: 180,
});

function AboutUs() {
    // Array containing card data for section 2 
    const cards = [
    {
        title: 'Surveillance',
        content:
        'RHM allows families to dynamically and remotely keep track of live, home conditions while away at work or holiday. We aim to give families a peace of mind when they leave their homes.',
        media: CCTVImage,
    },
    {
        title: 'Companionship',
        content:
        'The robot is shaped like a dog which helps alleviates loneliness through daily interactions with the elderly, or occupies young children.',
        media: ComImage,
    },
    {
        title: 'Low Cost',
        content:
        'The platform is made using cheap, common components and is no larger than a shoe. Only one is required to patrol an apartment.',
        media: LCImage,
    },
    {
        title: 'Reduced Discomfort',
        content:
        'Gesture recognition also allows the platform to function as a “toy”, reducing potential discomfort surrounding the robot. ',
        media: RDImage,
    },
    ];
    
    return (
    <PageContainer>
        {/*First Section: Quick intro*/}
        <Section className="section1">

        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}> {/*Two seperate grid containers for text and Image */}
                <Box padding="150px"> {/* Moves the text closer to the centre*/}
                    <Typography variant="h3"  fontWeight="bold" gutterBottom>
                    Robotic Home Monitoring
                    </Typography>
                    <Typography variant="h6">
                    Your one stop solution for safe, secure and affordable home security.
                    The leading choice for families.
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Image src={RobotDogImage} alt="Robot Dog Image" />
                </Box>
            </Grid>
        </Grid>

        </Section>

        {/*Second Section: Benefits*/}
       <Section id="section2" className="section2">
        
        {/*Grid container*/}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            {/* Left side (title) */}
            <Grid item xs={12} md={6} gutterBottom align="center">
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                Why Choose <span className="redmulticolored-text">OUR</span> Product?
                </Typography>
                <Typography variant="h6">
                It comes down to four essential features for every household.
                </Typography>
            </Grid>

        {/* Right side (2x2 grid of cards) */}
        <Grid item container xs={12} md={6} spacing={2} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
            <Grid key={index} item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <CustomCard>
                <Media component="img" image={card.media} alt="Card Media"/>
                <CardContent>
                
                <Typography variant="h5" component="div" gutterBottom style={{ fontWeight: 'bold', fontSize: '24px', fontFamily: 'sans-serif' }}>
                    {card.title}
                </Typography>
                <Typography variant="body2" style={{ fontSize: '16px', fontFamily: 'sans-serif' }}>
                    {card.content}
                </Typography>
                </CardContent>
            </CustomCard>
            </Grid>
        ))}
        </Grid>
    </Grid>
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
  );
}

export default AboutUs;
