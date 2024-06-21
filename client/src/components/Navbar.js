import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SmartToySharpIcon from '@mui/icons-material/SmartToySharp';
import Stack from '@mui/material/Stack';
import {Link , useLocation} from 'react-router-dom';

function Navbar(){
    const location = useLocation();
    const { pathname } = location;

    //exclude Navbar from Control
    if(pathname.includes("/Control")||pathname.includes("/control")) return null;

  return (
    <AppBar position="static">
        <Toolbar>
          <SmartToySharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#/" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            RHM
          </Typography>

          <Stack direction='row' spacing='2' sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
            <div>
            <Button color = 'inherit' component={Link} to="/">Guides</Button>
            <Button color = 'inherit' component={Link} to="/">Functionalities</Button>
            <Button color = 'inherit' component={Link} to="/">Blog</Button>
            </div>

            <Stack direction='row' spacing={2}>
            <Button variant = 'outlined'color = 'inherit' component={Link} to="/Home">Get Started</Button>
            </Stack>

          </Stack>
        </Toolbar>
    </AppBar>
  );
}
export default Navbar;