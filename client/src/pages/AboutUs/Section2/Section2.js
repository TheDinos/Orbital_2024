import React from 'react';
import {Grid, Typography} from '@mui/material';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import CCTVImage from './images/CCTVImage.jpg';
import ComImage from './images/ComImage.jpg';
import LCImage from './images/LCImage.jpg';

import './Section2.css';

const CustomCard = styled(Card)({
    minWidth: 360, 
    maxWidth: 370,
    minHeight: 200,
    maxheight: 320,
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
        ];

    return (
    <div> 
    {/*Title*/}
    <Typography variant="h1" fontWeight="bold" fontSize='65px' style={{ textAlign: 'center'}} gutterBottom>
        Why Choose <span className="redmulticolored-text">RHM</span>?
    </Typography>        
        
    {/*Cards*/}
    <Grid container spacing={9} justifyContent="center" alignItems="center">
        {cards.map((card, index) => (
            <Grid key={index} item xs={12} sm={4} md={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <CustomCard>
                    <Media component="img" image={card.media} alt="Card Media" />
                    <CustomCardContent>
                        <Typography variant="h2" component="div" gutterBottom style={{fontWeight: 'bold', fontSize: '28px',  fontFamily: 'Poppins, sans-serif',}}>
                            {card.title}
                        </Typography>
                        <Typography variant="body2" style={{ fontSize: '18px', fontFamily:'Poppins, sans-serif'}}>
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
 