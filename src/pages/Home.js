import React from "react";
import LandingPage from "./LandingPage";
import ReactAudioPlayer from 'react-audio-player';


const Home = () => {
  
    return <div>
      <LandingPage></LandingPage>
      <ReactAudioPlayer
        src="/sounds/PokémonThemeSong.mp3"
        autoPlay
      />
    </div>
  };
  
export default Home;