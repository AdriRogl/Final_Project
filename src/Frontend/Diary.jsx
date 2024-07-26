import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./diary.css";

const Diary = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  console.log("Diary");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim() !== "") {
      const response = generateChatResponse(userInput);
      setChatHistory([...chatHistory, { user: userInput }, { bot: response }]);
      setUserInput("");
    }
  };

  const handleEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleGameClick = () => {
    navigate("/game"); //Se implementa una función para que llame a nuestra interfaz de juego
  };

  const generateChatResponse = (userInput) => {
    const lowercaseInput = userInput.toLowerCase();
    // Se implementa la lógica para generar la respuesta automática
    // Usamos un condicional para determinar la respuesta de parte del chat
    if (lowercaseInput.includes("hello")) {
      return "¡Hola! ¿En qué puedo ayudarte hoy?";
    } else if (lowercaseInput.includes("sad")) {
      return "Lamento escuchar que estás triste. Recuerda que las cosas mejoran con el tiempo. ¿Quieres hablar más sobre lo que te está pasando?";
    } else if (lowercaseInput.includes("help")) {
      return "Claro, estoy aquí para ayudarte. ¿Qué necesitas?";
    } else {
      return "Entiendo. Cuéntame más sobre lo que te está sucediendo y veré cómo puedo asistirte.";
    }
  };
  const handleBackClick = () => {
    navigate(-1); // Navega hacia atrás en el historial
  };
  return (
    <div className="diary-container">
      <div className="left-section">
        <div className="journal-box">
          <img
            src="../src/Frontend/Images/diario (2).jpg"
            alt="Diario"
            className="journal-image"
          />
          <textarea
            placeholder="En este espacio puedes colocar la frase que más te inspira"
            className="journal-textarea"
          ></textarea>
        </div>
        <div className="game-box">
          <img
            src="../src/Frontend/Images/card.png"
            className="game-image"
            onClick={handleGameClick} //Al dar click se desplegará nuestra interfaz game
          />
        </div>
      </div>
      <div className="center-section">
        <textarea
          placeholder="Dime cómo te estás sintiendo..."
          value={userInput}
          onChange={handleUserInput}
          className="user-input"
        ></textarea>
        <button onClick={handleSubmit} className="submit-button">
          Enviar
        </button>
        <div className="chat-history">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.user ? "user-message" : "bot-message"
              }`}
            >
              {message.user ? message.user : message.bot}
            </div>
          ))}
        </div>
      </div>
      <div className="right-section">
        <div className="calendar-box">
          <h3>Calendario</h3>
          <img src="../src/Frontend/Images/Calendar.jpeg" alt="Feliz"></img>
          <p>Fecha actual: {new Date().toLocaleDateString()}</p>
          <div className="emotion-calendar">
            {selectedEmotion && (
              <img
                src={`../src/Frontend/Images/${selectedEmotion}.jpeg`}
                alt={selectedEmotion}
                className="calendar-emotion"
              />
            )}
          </div>
          <div className="emotion-icons">
            <img
              src="../src/Frontend/Images/Happy.jpeg"
              alt="Feliz"
              className={selectedEmotion === "Happy" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("Happy")}
            />
            <img
              src="../src/Frontend/Images/Sad.jpeg"
              alt="Triste"
              className={selectedEmotion === "Sad" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("Sad")}
            />
            <img
              src="../src/Frontend/Images/Angry.jpeg"
              alt="Enojado"
              className={selectedEmotion === "Angry" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("Angry")}
            />
          </div>
        </div>
      </div>
      <button onClick={handleBackClick} className="back-button">
        Volver
      </button>
    </div>
  );
};

export default Diary;
