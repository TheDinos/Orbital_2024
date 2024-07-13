import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import RobotDogImage from './RobotDogImage.png'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import '../Intro/Intro.css'
import BlogImage from './images/BlogImage.jpg';
import CCTVImage from './images/CCTVImage.jpg';
import ComImage from './images/ComImage.jpg';
import RDImage from './images/RDImage.jpg';
import LCImage from './images/LCImage.jpg';
import Paper from '@mui/material/Paper';

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
    minWidth: 275,
    maxWidth: 345,
    minHeight: 150,
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
        <Section id="section1">

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
       <Section id="section2">

        {/*Header for Section 2*/}
        <Paper elevation={3}
            sx={{ padding: 2, 
                background: 'rgba(255, 255, 255, 0.6)', 
                width: 1100, 
                textAlign: 'center',
                marginBottom: "20px"
                }}
            >
                <Typography
                    variant="h5" // Adjust variant based on your needs
                    sx={{
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: '700', // '900' for Black weight
                        fontSize: '36px', // Font size 36
                        color: 'rgb(44, 45, 46)', // Black color
                    }}>
                Why Choose OUR Product?
                </Typography>
        </Paper>
        
        {/*Grid for 2x2 card content*/}
        <Grid container spacing={1} justifyContent="center" alignItems='center' >
            {cards.map((card, index) => (
            <Grid item key={index} xs={12} md={6}>
                <CustomCard>
                    <Media
                    component="img"
                    image={card.media}
                    alt="Card Media"
                    />
                    <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        {card.title}
                    </Typography>
                    <Typography variant="body2">
                        {card.content}
                    </Typography>
                    </CardContent>
                </CustomCard>
            </Grid>
            ))}
        </Grid>
       </Section>


        {/*Third Section: Quick start*/}
        <Section id="section3">

        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Image src={RobotDogImage} alt="Robot Dog Image" />
                </Box>
            </Grid>
            
            <Grid item xs={12} md={6}> {/*Two seperate grid containers for text and Image */}
                <Box padding="150px"> {/* Moves the text closer to the centre*/}
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    How to get started
                    </Typography>
                    <Typography variant="body1" component="div">

                        <Typography variant="h6" gutterBottom>
                            Basic Operation
                        </Typography>
                        <ul>      
                            <li>Turn on the robot.</li>
                            <li>Enter the web application, and navigate to the ‘Login’ page.</li>
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


                        <Typography variant="h6" gutterBottom>
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
