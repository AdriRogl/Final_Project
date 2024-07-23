import React, { useState, useEffect } from 'react';
import './game.css'; // Estilos CSS

const Game = () => {
  //insertamos variables
  const [icons, setIcons] = useState(["❤️", "🌹", "🍫", "🍦", "🎈", "🎁", "❤️", "🌹", "🍫", "🍦", "🎈", "🎁"]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState([]);
  ////inicializa el juego barajando las targetas y comenzara el tremporizador
  useEffect(() => {
    shuffleArray(icons);
    startTimer();
  }, []);
  ///aqui revisamos si dos targetas han sido reveladas y llamamos a checkMatch que nos da el tiempo que el usuario puede ver el contenido de la carta 

  useEffect(() => {
    if (revealedCards.length === 2) {
      setTimeout(checkMatch, 500);
    }
  }, [revealedCards]);
   /// nos verifica si todas las cartas encontraron su par, finalizando el juego
  useEffect(() => {
    if (matchedPairs === icons.length / 2) {
      setGameOver(true);
      startConfetti();
    }
  }, [matchedPairs]);
  ///// baraja de manera aleatoria utilizando el algoritmo de fisher-yates
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  ///se encargara dde revelar solamente dos cartas 
  const revealCard = (icon, index) => {
    if (revealedCards.length === 2 || revealedCards.some(card => card.index === index)) {
      return;
    }
    //// si ninguna condicion es verdsdera la funcion agrega la carta revelada a revealedcard
    setRevealedCards([...revealedCards, { icon, index }]);
  };
  /////verifica si las dos cartas reveladas en el juego de memoria coinciden
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
  /// verifica si las dos
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
    <div className="app">
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

export default Game;
