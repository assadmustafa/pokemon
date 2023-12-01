import React, { useState, useEffect } from "react";
import axios from "axios";

const Game = () => {
  const [pokemon, setPokemon] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [timer, setTimer] = useState(10); // Change the initial timer value to 10
  const [score, setScore] = useState(0);
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
        handleNextPokemon();
        setScore(0);
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
      setTimer(10); // Change the timer value to 10 for each new Pokemon
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  const handleOptionClick = (option) => {
    if (option === pokemon.name) {
      setCorrect(true);
      setScore((prevScore) => prevScore + 1);
      clearInterval(timerInterval);
    } else {
      setCorrect(false);
    }
    setSelectedOption(option);
  };

  const handleNextPokemon = () => {
    setCorrect(false);
    setSelectedOption(null);
    fetchPokemon();
  };

  return (
    <div className="achtergrond font-pokemon">
      <div className="game-container font-pokemon">
        {pokemon && (
          <div className="font-pokemon">
            <div className="mr">
              <img
                className="pokemon"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>

            <div className="options font-pokemon">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`option font-pokemon`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="console">
        <div className="score">
          <p>Score: {score}</p>
        </div>
        {!correct && selectedOption && (
          <div className="wrong">
            <p>Wrong! The correct answer is {pokemon.name}.</p>
          </div>
        )}
        {correct && (
          <div className="correct ">
            <p>Correct!</p>
            <button onClick={handleNextPokemon} className="next font-pokemon">
              Next Pokémon
            </button>
          </div>
        )}
        <div className="timer">
          <p>Time left: {timer}s</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
