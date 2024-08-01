import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./game.css"; // Estilos CSS

const Game = () => {
  const navigate = useNavigate();
  // Emojis iniciales y variables de estado
  const initialIcons = [
    "❤️",
    "🌹",
    "🍫",
    "🍦",
    "🎁",
    "🎃",
    "🐱",
    "🐶",
    "🌟",
    "🍒",
  ];

  const [icons, setIcons] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [showImage, setShowImage] = useState(true); // Estado para controlar la visibilidad de la imagen de fondo
  const [backImage, setBackImage] = useState(
    "url('../public/Images/card.png')"
  ); // Ruta a la imagen de fondo
  const [Loser, setLoser] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledIcons = shuffleArray([...initialIcons, ...initialIcons]);
    setIcons(shuffledIcons);
    setRevealedCards([]);
    setMatchedPairs(0);
    setMatchedIndexes([]);
    setErrors(0);
    setGameOver(false);
    setConfetti([]);
    setShowImage(true); // Muestra la imagen de fondo al inicio
  };

  useEffect(() => {
    if (revealedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }, [revealedCards]);

  // Verifica si se ha encontrado todos los pares

  useEffect(() => {
    if (matchedPairs === initialIcons.length) {
      setGameOver(true);
      startConfetti();
    }
  }, [matchedPairs]);

  useEffect(() => {
    if (errors > initialIcons.length) {
      setGameOver(true);
    }
  }, [errors]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const revealCard = (icon, index) => {
    if (
      revealedCards.length === 2 ||
      revealedCards.some((card) => card.index === index) ||
      matchedIndexes.includes(index)
    ) {
      return;
    }
    setRevealedCards([...revealedCards, { icon, index }]);
    setShowImage(false); // Oculta la imagen de fondo al revelar una carta
  };

  const checkMatch = () => {
    const [firstCard, secondCard] = revealedCards;
    if (firstCard.icon === secondCard.icon) {
      setMatchedPairs(matchedPairs + 1);
      setMatchedIndexes([...matchedIndexes, firstCard.index, secondCard.index]);
    } else {
      setErrors(errors + 1);
    }
    setRevealedCards([]);
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
              animation: `confetti-animation ${delay}s linear infinite`,
            }}
          />,
        ]);
      }, (delay / totalConfetti) * i * 1000);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Navega hacia atrás en el historial
  };

  return (
    <div className="app">
      <div className="counters">
        <div>Aciertos: {matchedPairs}</div>
        <div>Errores: {errors}</div>
      </div>
      <div id="gameContainer">
        {showImage && (
          <div className="overlay" style={{ backgroundImage: backImage }}></div>
        )}
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`card ${
              revealedCards.some((card) => card.index === index) ||
              matchedIndexes.includes(index)
                ? "revealed"
                : ""
            }`}
            onClick={() => revealCard(icon, index)}
          >
            <div className="back">{icon}</div>
            <div className="front" style={{ backgroundImage: backImage }}></div>
          </div>
        ))}
      </div>
      {gameOver && matchedPairs > errors ? (
        <div className="message">
          <h2>¡Has Ganado!</h2>
          <button className="button" onClick={startGame}>
            Jugar otra vez
          </button>
          <button className="button" onClick={handleBackClick}>
            Salir del juego
          </button>
        </div>
      ) : gameOver ? (
        <div className="message">
          <h2>Game Over</h2>
          <p>Aciertos: {matchedPairs}</p>
          <p>Errores: {errors}</p>
          <button className="button" onClick={startGame}>
            Jugar otra vez
          </button>
          <button className="button" onClick={handleBackClick}>
            Salir del juego
          </button>
        </div>
      ) : null}
      {confetti}
    </div>
  );
};

export default Game;
