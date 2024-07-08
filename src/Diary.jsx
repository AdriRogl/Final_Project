import React, { useState } from "react";
import "./diary.css";

const Diary = () => {
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
      setChatHistory([...chatHistory, { user: userInput, bot: response }]);
      setUserInput("");
    }
  };

  const handleEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const generateChatResponse = (userInput) => {
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

  return (
    <div className="diary-container">
      <div className="left-section">
        <div className="journal-box">
          <img
            src="./Images/diario (2).jpg"
            alt="Diario"
            className="journal-image"
          />
          <textarea
            placeholder="En este espacio puedes colocar lo que
            quieras y puedas verlo todo el tiempo"
            className="journal-textarea"
          ></textarea>
        </div>
        <div className="game-box">
          <img src="./Images/cards.jpg" alt="Juego" className="game-image" />
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
          <img src="./Images/Calendar.jpeg" alt="Feliz"></img>
          <p>Fecha actual: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="emotion-box">
          <h3>Emoción del día</h3>
          <div className="emotion-icons">
            <img
              src="./Images/happy.jpeg"
              alt="Feliz"
              className={selectedEmotion === "happy" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("happy")}
            />
            <img
              src="./Images/sad.jpeg"
              alt="Triste"
              className={selectedEmotion === "sad" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("sad")}
            />
            <img
              src="./Images/angry.jpeg"
              alt="Enojado"
              className={selectedEmotion === "angry" ? "selected-emotion" : ""}
              onClick={() => handleEmotion("angry")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
