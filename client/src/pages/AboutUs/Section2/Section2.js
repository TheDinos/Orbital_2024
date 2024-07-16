import React from 'react';
import {Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import CCTVImage from './images/CCTVImage.jpg';
import ComImage from './images/ComImage.jpg';
import RDImage from './images/RDImage.jpg';
import LCImage from './images/LCImage.jpg';

const CustomCard = styled(Card)({
    minWidth: 350,
    maxWidth: 350,
    minHeight: 350,
    maxheight: 350,
    margin: '20px',
    textAlign: 'justify',
    border: '20px solid #f2f1eb',
    backgroundColor: '#f2f1eb'
});

const Media = styled(CardMedia)({
    height: 300, 
    objectFit: 'cover', 
});

const CustomCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
});

function Section2() {
    // Array containing card data for section 2 
    const cards = [
        {
            title: 'Surveillance',
            content: 'Families can dynamically and remotely track live, home conditions while away at work or holiday, giving them a peace of mind.',
            media: CCTVImage,
        },
        {
            title: 'Companionship',
            content: 'The robot is shaped like a dog which helps alleviates loneliness through daily interactions with the elderly, or occupies young children.',
            media: ComImage,
        },
        {
            title: 'Low Cost',
            content: 'The platform is made using cheap, common components and is no larger than a shoe. Only one is required to patrol an apartment.',
            media: LCImage,
        },
        {
            title: 'Reduced Discomfort',
            content: 'Gesture recognition also allows the platform to function as a “toy”, reducing potential discomfort surrounding the robot. ',
            media: RDImage,
        },
        ];
    return (
    <div> 
    {/*Title*/}
    <Typography variant="h1" fontWeight="bold" gutterBottom>
        Why Choose <span className="redmulticolored-text">RHM</span>?
    </Typography>        
        
    {/*Cards*/}
    <Grid container spacing={12} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
            <Grid key={index} item xs={12} sm={3} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomCard>
                    <Media component="img" image={card.media} alt="Card Media" />
                    <CustomCardContent>
                        <Typography variant="h2" component="div" gutterBottom style={{fontWeight: 'bold', fontSize: '30px'}}>
                            {card.title}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '22px'}}>
                            {card.content}
                        </Typography>
                    </CustomCardContent>
                </CustomCard>
            </Grid>
        ))}
    </Grid>

    </div>
    );
  }
  
export default Section2;
 