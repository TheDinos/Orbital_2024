import '../App.css';
import  React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'; 
import {Link} from 'react-router-dom';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


function Connect(){

    const [connectError, setConnectError] = useState(false); //Sets to true when there is a connection error
    const [loginError, setLoginError] = useState(true); //Sets to true when there is a login error
    
    const handleConnect = () => {
        // Here you would handle the connection logic with the entered password
        //setSnackbarOpen(true);
    };

    return(
        <div className="App">
            <header className="App-header">
                <h1>Connect to Robot</h1>
                
                <Collapse in={connectError || loginError}>
                    <Alert
                        icon={false}
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setConnectError(false);
                                setLoginError(false);
                            }}
                            >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                        }
                    sx={{ mb: 2 }}>
                        {(loginError) ? "Incorrect robot ID or password." : 
                         (connectError) ? "Unable to establish robot connection." : ""}
                    </Alert>
                </Collapse>                  
                
                <Box 
                    paddingLeft={5} paddingRight={5} paddingTop={5}
                    sx={{
                        width: { xs: '70vw', md: '25vw' }, // 50% of viewport width on extra-small screens, 25% on medium and larger screens
                        aspectRatio: '4 / 3',
                        borderRadius: 2,
                        bgcolor: '#DCDCDC',
                    }} >
                    
                    <Stack spacing={6} direction="column">
                        
                        <TextField 
                        required
                        label = "Robot ID" 
                        colour = "secondary"
                        type = "username"
                        margin = "normal" 
                        focused/>
                        
                        <TextField 
                        required
                        
                        label = "Password" 
                        colour = "secondary"
                        type = "password"
                        margin = "normal" 
                        focused/>

                        <Button 
                            size="large" 
                            variant="contained" 
                            component={Link} to="/control" 
                            onClick={handleConnect}
                            sx={{width:'100%', fontSize:'100%'}}>
                        Connect
                        </Button>
                    </Stack>
                    
                </Box>
                </header>
            </div>
    );
}
export default Connect;