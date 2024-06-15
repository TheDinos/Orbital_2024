import '../App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'; 
import {Link} from 'react-router-dom';
import { ListItemText, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import {socket} from '../socket'

function Connect(){

    const robots = [
        { id: 'XXXXX1'},
        { id: 'XXXXX2'},
        { id: 'XXXXX3'},
        { id: 'XXXXX4'},
        { id: 'XXXXX5'},
      ];

    const [selectedRobot, setSelectedRobot] = React.useState(1);
    const [password, setPassword] = React.useState(1);

    const handleRobotClick = (id) => {
        setSelectedRobot(id);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConnect = () => {
        //.emit("RobotConnect", );
        
        // Here you would handle the connection logic with the entered password
        //setSnackbarOpen(true);
    };

    return(
        <div className="App">
            <header className="App-header">
                <h1>Choose mode of connection</h1>
                <Grid container  borderTop = {1} columnSpacing={{ xs: 2, sm: 4,}} style={{paddingLeft:"30px", paddingRight:"30px", minHeight: "100vh" }}>
                    <Grid   item xs= {12} sm = {6} style={{paddingRight:'30px'}} >
                        <h1>Devices Available</h1>
                        <List>
                            {robots.map((robot) => (
                                <div key={robot.id}>
                                <ListItemButton onClick={() => handleRobotClick(robot)}>
                                    <ListItemText primary={robot.id} />
                                </ListItemButton>
                                {selectedRobot && selectedRobot.id === robot.id && (
                                    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
                                        <TextField
                                            label="Enter Password"
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            sx={{ marginBottom: '16px' }}
                                        />
                                         <Button 
                                            size="large" 
                                            variant="contained" 
                                            component={Link} to="/control" 
                                            onClick={handleConnect}>
                                            Connect
                                        </Button>
                                    </Box>
                                )}
                                <Divider/>
                                </div>
                            ))}
                        </List>
                        
                    </Grid>    
                    


                    <Grid item xs= {12} sm = {6} borderLeft={1} >
                        <h2>If device not shown, input device ID and password manually</h2>
                    
                        <Stack spacing={6} direction="column" sx={{ mt: 4 }}>
                            <TextField 
                            required
                            label = "ID" 
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

                            <div style={{height:20}}/>
                        </Stack>
                        
                        <Button 
                            size="large" 
                            variant="contained" 
                            component={Link} to="/control" 
                            onClick={handleConnect}
                            sx={{ height: '100px', width:'100%', fontSize:'100%'}}>
                            Connect
                        </Button>
                    </Grid>
                </Grid>
                </header>
            </div>
    );
}
export default Connect;