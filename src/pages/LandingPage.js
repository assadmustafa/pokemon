import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const onStart = () => {
    // Replace '/another-page' with the actual path you want to navigate to
    navigate("/game");
  };

  return (
    <div className="container-landing">
      {/* Local Video */}
      <video autoPlay loop muted className="video">
        <source src="/videos/myvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content in the middle */}
      <div className="content">
        {/* Animated Gradient Text */}
        <h1>
          <img src="./images/hero.png"></img>
        </h1>

        {/* Pokeball-style Start Button */}
        <button onClick={onStart} className="pokeball">
          <img src="/images/pokeball.png" alt="Start" />
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
