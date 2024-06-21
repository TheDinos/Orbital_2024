import  React, {useState} from 'react';
import useWebSocketConnection from '../useWebsocket.js'
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'; 
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';



function ControlBar() { 

    const {deviceStatus} = useWebSocketConnection();
    const [disconnectOpen, setDisconnectOpen] = useState(false);
    
    const openDisconnectDialog = () => {
        setDisconnectOpen(true)
    }

    const closeDisconnectDialog = () => {
        setDisconnectOpen(false)
    }

    const handleDisconnect = () =>{
        ///add some logic here
    }

    return (
        <AppBar position="static" sx={{bgcolor:"#36454F"}}>
        <Toolbar>
            <Stack 
            direction='row' 
            paddingLeft={1} //Space away from the icon
            spacing={3} 
            divider={<Divider orientation="vertical" flexItem sx={{color:'white'}}/>} 
            sx={{ flexGrow: 1, alignItems:'center', justifyContent: 'flex-start' }}>
                
                <SettingsIcon fontSize='large'/>
                <Box color='inherit'>Connection Status: {deviceStatus}</Box>
                <Box color='inherit'>Battery Level: </Box>
                <Box color='inherit'>Connection Time: </Box>   
            </Stack>
      

            <Button variant="contained" color="error" onClick={openDisconnectDialog}>Disconnect</Button>
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
  