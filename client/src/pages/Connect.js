import React, { useState } from 'react';
import { Box, Container, IconButton, Collapse, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../firebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';

const PageContainer = styled(Container)({ //Container for the entire page
    background: 'linear-gradient(90deg, #12100e, #2d3436, #434343)',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '120px'
});

function Connect(){
    const {login} = useAuth();
    const navigate = useNavigate();
    const [connectError, setConnectError] = useState(false); //Sets to true when there is a connection error
    const [loginError, setLoginError] = useState(false); //Sets to true when there is a login error
    const [loginErrorMsg, setLoginErrorMsg] = useState("");

    const [robotId, setRobotId] = useState('');
    const [robotPw, setRobotPw] = useState('');
    
    const handleConnect = async () => {
        try{
            await login(robotId, robotPw);
            navigate("/Control"); //redirects to Control if login is successful, Control is a protected route
        }
        catch (error) {
            //console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setLoginErrorMsg("RobotId doesn't exist");
                setLoginError(true);
            } else if (error.code === 'auth/invalid-credential') {
                setLoginErrorMsg("Wrong password");
                setLoginError(true);
            } else { //for connection errors
            }
        }
    };

    return(
        <PageContainer>
            <Box  sx={{width: { xs: '70vw', md: '30vw' }}}> {/*50% of viewport width on extra-small screens, 25% on medium and larger screens*/}
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
                    sx={{ mb: 2, fontSize: '18px', borderRadius: 3}}>
                        {(loginError) ? loginErrorMsg : 
                         (connectError) ? "Unable to establish robot connection." : ""}
                    </Alert>
                </Collapse>                  
                
                <Box 
                    padding={6}
                    sx={{
                        aspectRatio: '4 / 3',
                        borderRadius: 8,
                        bgcolor: '#DCDCDC',
                    }} >                    
                    
                    <Stack spacing={6} direction="column">

                        <h1 style={{color: '#0000000', fontStyle: 'Poppins', fontSize: '55px'}}>Connect to Robot</h1>

                        <TextField 
                        required
                        label = "Robot ID" 
                        colour = "secondary"
                        type = "username"
                        margin = "normal" 
                        value = {robotId}
                        onChange={e => setRobotId(e.target.value)}
                        focused/>
                        
                        <TextField 
                        required
                        label = "Password" 
                        colour = "secondary"
                        type = "password"
                        margin = "normal" 
                        value = {robotPw}
                        onChange={e => setRobotPw(e.target.value)}
                        focused/>

                        <Button 
                            size="large" 
                            variant="contained" 
                            onClick={handleConnect}
                            sx={{width:'100%', fontSize:'100%'}}>
                        Connect
                        </Button>
                    </Stack>
                </Box>
                </Box>
        </PageContainer>
        );
}
export default Connect;