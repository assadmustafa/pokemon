import React, { useState } from "react";
import LandingPage from "./LandingPage";
// import ReactAudioPlayer from 'react-audio-player';


const Home = () => {
    // const [isMuted, setIsMuted] = useState(false);

    // const handleToggleMute = () => {
    //     setIsMuted(!isMuted);
    // };

    return <div>
        <LandingPage />
        {/*<ReactAudioPlayer*/}
        {/*    src="/sounds/PokémonThemeSong.mp3"*/}
        {/*    autoPlay*/}
        {/*    volume={isMuted ? 0 : 1} // Set volume to 0 when muted, 1 otherwise*/}
        {/*/>*/}
        {/*<button onClick={handleToggleMute}>*/}
        {/*    {isMuted ? "Unmute" : "Mute"}*/}
        {/*</button>*/}
    </div>
};
  
export default Home;