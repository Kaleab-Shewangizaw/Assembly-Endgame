import { useState } from "react";
import { languages } from "./languages.js";
import clsx from "clsx";

export default function App() {
  const [guessed, setGuessed] = useState([]);
  const [currentWord, setCurrrentWord] = useState("react");

  const wrongGuessedArray = guessed.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessed.includes(letter));
  const isGameLost = wrongGuessedArray >= languages.length - 1;

  const gameOver = isGameWon || isGameLost;

  const languageElements = languages.map(function (language, index) {
    const isLanguageLost = index < wrongGuessedArray;

    const style = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    const className = clsx("chip", isLanguageLost && "lost");
    return (
      <span className={className} style={style} key={language.name}>
        {language.name}{" "}
      </span>
    );
  });

  const word = currentWord.split("").map((letter, index) => {
    return (
      <span className="letter" key={index}>
        {guessed.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetters(letter) {
    setGuessed((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const keyboard = alphabet.split("").map((letter) => {
    const isGuessed = guessed.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        onClick={() => addGuessedLetters(letter)}
        key={letter}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx('game-status', {
    won:isGameWon,
    lost:isGameLost,
  })

  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word within 8 attempts to keep the programming world safe
            from Assembly!
          </p>
        </header>
        <section className={gameStatusClass}>
          {gameOver ? (
            isGameWon ? (
              <>
                <h2>you win!</h2>
                <p>Wll done! 🎉</p>
              </>
            ) : (
              <>
                <h2>Game Over!</h2>
                <p>you lose! Better start again!</p>
              </>
            )
          ) : null}
        </section>
        <section className="language-chips">{languageElements}</section>
        <section className="currentWord">{word}</section>
        <section className="keyboard">{keyboard}</section>

        {gameOver && <button className="new-game">New Game</button>}
      </main>
    </>
  );
}
