import React, { useState } from 'react';
import useWebSocketConnection from '../../components/UseWebsocket.js';
import Stack from '@mui/material/Stack';
import { AppBar, Toolbar, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../firebaseAuth/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const BarText = styled(Box)({
    color: '#ffffff',
    fontSize: '20px', 
    fontFamily: 'Canva Sans, sans-serif',
});

function ControlBar() { 
    const {logout} = useAuth();
    const navigate = useNavigate();

    const {deviceStatus} = useWebSocketConnection();
    const [disconnectOpen, setDisconnectOpen] = useState(false);
    
    const openDisconnectDialog = () => {
        setDisconnectOpen(true)
    }

    const closeDisconnectDialog = () => {
        setDisconnectOpen(false)
    }

    const handleDisconnect = async () =>{
        try{
            await logout();
            navigate("/Control"); //redirects to Control if login is successful, Control is a protected route
        }
        catch (error) {
            console.log(error.code);
        }
    }

    return (
        <AppBar position="static" sx={{color: '#ffffff', bgcolor:'#858896', marginBottom: '15px'}} >
        <Toolbar>
            <Stack 
            direction='row' 
            paddingLeft={1} //Space away from the icon
            spacing={3} 
            divider={<Divider aria-hidden="true" orientation="vertical" flexItem sx={{bgcolor: "#ffffff", width: '4px'}}/>} 
            sx={{ flexGrow: 1, alignItems:'center', justifyContent: 'flex-start' }}>
                
                <SettingsIcon fontSize='large'/>
                <BarText>Connection Status: {deviceStatus}</BarText>
                <BarText>Connection Time: </BarText>   
            </Stack>
      

            <Button variant="contained" color="error" onClick={openDisconnectDialog}  sx={{ fontSize: '15px', fontFamily: 'Canva Sans, sans-serif', }}>Disconnect</Button>
            <Dialog
                open={disconnectOpen}
                onClose={closeDisconnectDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Confirm Disconnection?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Disconnection will require you to login again. 
                </DialogContentText>    
            </DialogContent>
            <DialogActions>
            <Button onClick={handleDisconnect}>Disconnect</Button>
            <Button onClick={closeDisconnectDialog} autoFocus>Return</Button>
            </DialogActions>
            </Dialog>

        </Toolbar>
        </AppBar>
      
  
   
    );
  }
  
  export default ControlBar;
  