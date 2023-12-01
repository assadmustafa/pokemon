import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                    <img src="/images/pokeball.png" alt="Start" />
                </button>

                {/* Mute Button in Bottom Left */}
                <button className="mute-button" onClick={handleToggleMute}>
                    {isMuted ? "Unmute" : "Mute"}
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
