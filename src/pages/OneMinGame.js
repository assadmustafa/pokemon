import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OneMinGame = () => {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [timer, setTimer] = useState(60); // 1 minute timer
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const navigate = useNavigate();

  let timerInterval;

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (timer > 0 && !correct) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
      if (!correct) {
        setGameOver(true);
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, correct]);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 151) + 1;
  };

  const generateOptions = async (correctPokemon) => {
    const newOptions = [];
    const pokemonNames = [];
    for (let i = 0; i < 3; i++) {
      const randomPokemonId = getRandomPokemonId();
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`
      );
      if (
        response.data.name !== correctPokemon.name &&
        !pokemonNames.includes(response.data.name)
      ) {
        newOptions.push(response.data.name);
        pokemonNames.push(response.data.name);
      } else {
        i--;
      }
    }
    newOptions.push(correctPokemon.name);
    newOptions.sort(() => Math.random() - 0.5);
    setOptions(newOptions);
  };

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}/`
      );
      setPokemon(response.data);
      generateOptions(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const handleOptionClick = (option) => {
    if (option === pokemon.name) {
      setCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setCorrect(false);
    }
    setSelectedOption(option);
  };

  const handleNextPokemon = () => {
    setSelectedOption(null);
    setCorrect(false);
    fetchPokemon();
  };
  const handleRetry = () => {
    setSelectedOption(null);
    setGameOver(false);
    setTimer(60);
    setScore(0);
    setCorrect(false);
    fetchPokemon();
  };

  return (
    <div className="achtergrond font-pokemon">
      {gameOver ? (
        <div className="game-container font-pokemon game-over">
          <h2 className="game-over-text">Game Over!</h2>
          <p className="final-score">Your final score is: {score}</p>
          <div className="game-over-buttons">
            <button className="main-button font-pokemon" onClick={() => navigate("/")}>
              Main
            </button>
            <button className="retry-button font-pokemon" onClick={handleRetry}>
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="game-container font-pokemon">
          {pokemon && (
            <div className="font-pokemon">
              <div className="mr">
                <img
                  className="pokemon"
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                />
                <div className="console">
                  <div className="score">
                    <p>Score: {score}</p>
                  </div>
                  <div className="timer">
                    <p>Time left: {timer}s</p>
                  </div>
                </div>
              </div>
              <div className="options font-pokemon">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`option font-pokemon`}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {correct && (
                <div className="correct ">
                  <p>Correct!</p>
                  <button
                    onClick={handleNextPokemon}
                    className="next font-pokemon"
                  >
                    Next Pokémon
                  </button>
                </div>
              )}
              {!correct && selectedOption && (
                <div>

                  <div className="wrong">
                    <p>
                      Wrong! The correct answer is{" "}
                      <b className="correct_answer">{pokemon.name}</b>.
                    </p>
                    <br />
                    <div>
                    <button
                      onClick={handleNextPokemon}
                      className="next font-pokemon"
                    >
                      Next Pokémon
                    </button>
                  </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneMinGame;
