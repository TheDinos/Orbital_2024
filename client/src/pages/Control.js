import Dpad from '../components/Dpad';
import RobotVideo from '../components/VideoLivestream';
import ControlBar from '../components/ControlTopBar';
import ControlMovementHeader from '../components/ControlMovementHeader'

function TeleOperation(){
    return(
        <div className="App">
            <header className="App-header">
            <ControlBar/>
            <RobotVideo/> 
            
            <ControlMovementHeader/>
            <Dpad/>
               
            </header>
        </div>
    );
}
export default TeleOperation