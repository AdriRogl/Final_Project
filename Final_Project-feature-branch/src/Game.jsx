import React, { useState, useEffect } from 'react';
import './game.css'; // Estilos CSS

const Game = () => {
  const initialIcons = ["❤️", "🌹", "🍫", "🍦", "🎈", "🎁", "❤️", "🌹", "🍫", "🍦", "🎈", "🎁"];
  const [icons, setIcons] = useState([...initialIcons]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    shuffleArray(icons);
    const timerId = startTimer();
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (revealedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }, [revealedCards]);

  useEffect(() => {
    if (matchedPairs.length === icons.length) {
      setGameOver(true);
      startConfetti();
    }
  }, [matchedPairs]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const revealCard = (icon, index) => {
    if (revealedCards.length === 2 || revealedCards.some(card => card.index === index) || matchedPairs.includes(index)) {
      return;
    }
    setRevealedCards([...revealedCards, { icon, index }]);
  };

  const checkMatch = () => {
    const [firstCard, secondCard] = revealedCards;
    if (firstCard.icon === secondCard.icon) {
      setMatchedPairs([...matchedPairs, firstCard.index, secondCard.index]);
    }
    setRevealedCards([]);
  };

  const startTimer = () => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(timerId);
          setGameOver(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return timerId;
  };

  const startConfetti = () => {
    const totalConfetti = 500;
    const delay = 6;

    for (let i = 0; i < totalConfetti; i++) {
      setTimeout(() => {
        setConfetti((prevConfetti) => [
          ...prevConfetti,
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * window.innerWidth}px`,
              animation: `confetti-animation ${delay}s linear infinite`
            }}
          />
        ]);
      }, (delay / totalConfetti) * i * 1000);
    }
  };

  const resetGame = () => {
    setIcons([...initialIcons]);
    setRevealedCards([]);
    setMatchedPairs([]);
    setTimer(60);
    setGameOver(false);
    setConfetti([]);
    shuffleArray(initialIcons);
    const timerId = startTimer();
    return () => clearInterval(timerId);
  };

  return (
    <div className="app">
      <div id="timer">{`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</div>
      <div id="gameContainer">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`card ${revealedCards.some(card => card.index === index) || matchedPairs.includes(index) ? 'revealed' : ''}`}
            onClick={() => revealCard(icon, index)}
          >
            {revealedCards.some(card => card.index === index) || matchedPairs.includes(index) ? icon : ''}
          </div>
        ))}
      </div>
      <div id="invitation" style={{ display: gameOver && matchedPairs.length === icons.length ? 'block' : 'none' }}>
        ¡Has Ganado!
      </div>
      <div id="invitation" style={{ display: gameOver && matchedPairs.length !== icons.length ? 'block' : 'none' }}>
        Se ha acabado el tiempo.
      </div>
      <button className="reset-button" onClick={resetGame}>Reiniciar Juego</button>
      {confetti}
    </div>
  );
};

export default Game;
