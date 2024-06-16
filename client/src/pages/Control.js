import Grid from '@mui/material/Grid';
import Dpad from '../components/Dpad';
import UpDown from '../components/UpDown';
import DeviceDashboard from '../video';

function TeleOperation(){
    return(
        <div className="App">
            <header className="App-header">
            <h1> <DeviceDashboard/> </h1>
            
            <Grid container borderTop={1} justifyContent="center" alignItems="center" columnSpacing={{ xs: 2, sm: 4,}}>
                <Grid item borderRight={1} xs= {12} sm = {6} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{textAlign: 'center'}}>Movement Controls</h1>
                </Grid>
                <Grid item xs= {12} sm = {6} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <h1 style={{textAlign: 'center'}}>Headtilt Controls</h1>
                </Grid>
                
                <Grid item borderRight={1} xs= {12} sm = {6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Dpad/>     
                </Grid>
                <Grid item xs= {12} sm = {6} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <UpDown/>
                </Grid>
            </Grid>
            </header>
        </div>
    );
}
export default TeleOperation