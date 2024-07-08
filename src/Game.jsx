import React, { useState, useEffect } from 'react';
import './game.css'; // Estilos CSS

const game = () => {
  const [icons, setIcons] = useState(["❤️", "🌹", "🍫", "🍦", "🎈", "🎁", "❤️", "🌹", "🍫", "🍦", "🎈", "🎁"]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    shuffleArray(icons);
    startTimer();
  }, []);

  useEffect(() => {
    if (revealedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }, [revealedCards]);

  useEffect(() => {
    if (matchedPairs === icons.length / 2) {
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
    if (revealedCards.length === 2 || revealedCards.some(card => card.index === index)) {
      return;
    }

    setRevealedCards([...revealedCards, { icon, index }]);
  };

  const checkMatch = () => {
    const [firstCard, secondCard] = revealedCards;

    if (firstCard.icon === secondCard.icon) {
      setMatchedPairs(matchedPairs + 1);
    } else {
      setIcons(icons.map((icon, index) => 
        index === firstCard.index || index === secondCard.index ? '' : icon
      ));
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

  return (
    <div className="game">
      <div id="timer">{`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}</div>
      <div id="gameContainer">
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`card ${revealedCards.some(card => card.index === index) ? 'revealed' : ''}`}
            onClick={() => revealCard(icon, index)}
          >
            {icon}
          </div>
        ))}
      </div>
      <div id="invitation" style={{ display: gameOver && matchedPairs === icons.length / 2 ? 'block' : 'none' }}>
        ¡Has Ganado
      </div>
      <div id="invitation" style={{ display: gameOver && matchedPairs !== icons.length / 2 ? 'block' : 'none' }}>
        Se ha acabado el tiempo.
      </div>
      {confetti}
    </div>
  );
};

export default game;
