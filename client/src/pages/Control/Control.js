import Dpad from './Dpad';
import RobotVideo from './VideoLivestream';
import ControlBar from './ControlTopBar';
import ControlMovementHeader from './ControlMovementHeader'

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