import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import './Intro.css'
import BlogImage from '../images/BlogImage.jpg';
import CCTVImage from '../images/CCTVImage.jpg';
import ComImage from '../images/ComImage.jpg';
import RDImage from '../images/RDImage.jpg';
import LCImage from '../images/LCImage.jpg';
import Paper from '@mui/material/Paper';

function Intro() {
  return (
    <div className="App-header"
        style={{
        backgroundImage: `url(${BlogImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingBottom: '40px'
      }}>
        <h1 className="HeaderFonts">Robotic Home Monitoring</h1>
        
        <Paper elevation={3}
        sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.6)', width: 1100, textAlign: 'center'}}
        >
            <Typography
                variant="h5" // Adjust variant based on your needs
                sx={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '700', // '900' for Black weight
                    fontSize: '36px', // Font size 36
                    color: 'rgb(44, 45, 46)', // Black color
                }}>
            The ultimate companion for a smart, safe and secure household
            </Typography>
            
            
        </Paper>

    <Stack spacing={6} direction="row" sx={{ mt: 4 }} style={{paddingBottom: '30px'}}>
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
            <CardMedia
                sx={{ height: 180, objectFit: 'contain'}}
                image= {CCTVImage}
                title="cctv"
            />
            <CardContent sx={{flexGrow:1}}>
                <Typography gutterBottom variant="h5" component="div">
                Surveillance
                </Typography>
                <Typography variant="body2" color="text.secondary"
                sx={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                }}>
                    Allows families to dynamically and remotely keep track of live, home conditions while away at work or holiday.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>   

        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
            <CardMedia
                sx={{ height: 180 }}
                image={ComImage}
                title="companionship"
            />
            <CardContent sx={{flexGrow:1}}>
                <Typography gutterBottom variant="h5" component="div">
                Companionship
                </Typography>
                <Typography variant="body2" color="text.secondary"
                sx={{
                textAlign: 'justify',
                textJustify: 'inter-word',
                }}>
                    The robot comes in the shape of the dog which helps 
                    alleviates loneliness through daily interactions with the elderly, or occupies young children.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>  
        
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
        <CardMedia
            sx={{ height: 180 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
        />
        <CardContent sx={{flexGrow:1}}>
            <Typography gutterBottom variant="h5" component="div">
            Surveillance
            </Typography>
            <Typography variant="body2" color="text.secondary"
            sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            }}>
                CCTV systems cost a lot. Multiple security cameras are required to cover all areas, 
                minimally one per room. This can result in high expenditures.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>   
    </Stack>

    <Paper elevation={3}
        sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.6)', width: 1100, textAlign: 'center'}}
        >
            <Typography
                variant="h5" // Adjust variant based on your needs
                sx={{
                    fontFamily: 'Arial, sans-serif',
                    fontWeight: '700', // '900' for Black weight
                    fontSize: '36px', // Font size 36
                    color: 'rgb(44, 45, 46)', // Black color
                }}>
            Benefits
            </Typography>
    </Paper>

    <Stack spacing={6} direction="row" sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
        <CardMedia
            sx={{ height: 180 }}
            image={LCImage}
            title="low cost"
        />
        <CardContent sx={{flexGrow:1}}>
            <Typography gutterBottom variant="h5" component="div">
            Low cost
            </Typography>
            <Typography variant="body2" color="text.secondary"
            sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            }}>
                The platform is made using cheap, common components and is no larger than a shoe. 
                Only one is required to patrol an apartment.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>   

        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
        <CardMedia
            sx={{ height: 180 }}
            image={RDImage}
            title="reduced discomfort"
        />
        <CardContent sx={{flexGrow:1}}>
            <Typography gutterBottom variant="h5" component="div">
            Reduced Discomfort
            </Typography>
            <Typography variant="body2" color="text.secondary"
            sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            }}>
               Gesture recognition also allows the platform to function as a “toy”, reducing potential discomfort surrounding the robot. 
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>  
        
        <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}>
        <CardMedia
            sx={{ height: 180 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
        />
        <CardContent sx={{flexGrow:1}}>
            <Typography gutterBottom variant="h5" component="div">
            Surveillance
            </Typography>
            <Typography variant="body2" color="text.secondary"
            sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            }}>
                CCTV systems cost a lot. Multiple security cameras are required to cover all areas, 
                minimally one per room. This can result in high expenditures.
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
        </Card>   
    </Stack>        
    </div>

  );
}

export default Intro;
