import { styled } from '@mui/system';
import Dpad from './Dpad';
import RobotVideo from './VideoLivestream';
import ControlTopBar from './ControlTopBar';
import ControlMovementHeader from './ControlMovementHeader'

const PageContainer = styled('div')({ //Container for the entire page
    background: 'linear-gradient(90deg, #12100e, #2d3436, #434343)',
    minHeight: '100vh',
    minWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
});

function TeleOperation(){
    return(
        <PageContainer>
            <ControlTopBar/>
            <RobotVideo/> 
            <ControlMovementHeader/>
            <Dpad/>
        </PageContainer>
    );
}
export default TeleOperation