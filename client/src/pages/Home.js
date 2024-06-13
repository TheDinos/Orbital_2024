import HomeImage from '../Images/HomeImage.jpg'
import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Link} from 'react-router-dom';



function Home() {
  return (
      <div className="App-header">
        <Grid container style={{height:'100%'}}>
            <Grid item xs={12} sm ={6}>
                <img 
                src={HomeImage} 
                style={{width: "100%", height: "100%", objectFit:"cover"}} 
                alt="therapy"
                />
            </Grid>
            <Grid 
                container 
                item 
                xs={12} 
                sm ={6}
                alignItems="center"
                direction = "column"
                justifyContent="center"
                >
            <h1 style={{textAlign:"center"}}> Choose one of the following actions:</h1>
            <Stack spacing={6} direction="column" sx={{ width:'800px', mt: 15 }}>
                <Button 
                variant="contained"
                component={Link} to="/Control"
                sx={{ height: '180px',fontSize:'100%' }}>
                Control Robot
                </Button>
                
                <Button 
                variant="contained"
                component={Link} to="/Connect"
                sx={{ height: '180px', fontSize:'100%'}}>
                Pair Robot
                </Button>
            </Stack>
            </Grid>
        </Grid>
               
      </div>
  );
}

export default Home;
