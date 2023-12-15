import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

library.add(faVolumeHigh, faVolumeXmark);

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  const onStart = () => {
    // Replace '/game' with the actual path you want to navigate to
    navigate("/game");
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="container-landing">
      {/* Local Video */}
      <video autoPlay loop muted={isMuted} className="video">
        <source src="/videos/myvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content in the middle */}
      <div className="content">
        {/* Animated Gradient Text */}
        <h1>
          <img src="./images/hero.png" alt="Hero" />
        </h1>

        {/* Pokeball-style Start Button */}
        <button onClick={onStart} className="pokeball">
          Start Game
        </button>

        {/* Mute Button in Bottom Left */}
        <button className="mute-button" onClick={handleToggleMute}>
          {isMuted ? (
              <FontAwesomeIcon icon="fa-solid fa-volume-xmark" />
          ) : (
              <FontAwesomeIcon icon="fa-solid fa-volume-high" />
          )}
        </button>
        <p className="homeText">
          login or signup to track score and play multiplayer
        </p>

      </div>
    </div>
  );
};

export default LandingPage;
