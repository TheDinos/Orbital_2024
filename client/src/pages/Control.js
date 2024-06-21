import Dpad from '../components/Dpad';
import RobotVideo from '../video';
import ControlBar from '../components/ControlBar';
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