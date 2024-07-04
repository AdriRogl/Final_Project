import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Register from "./Register";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="menu">
          <button className="conocenos">CONÓCENOS</button>
          <button className="contactanos">CONTÁCTANOS</button>
          <button className="iniciar-sesion">INICIAR SESIÓN</button>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <div className="content-box">
              <h1>Bienvenido a PeacePals</h1>
              <p>
                En un mundo agitado y lleno de responsabilidades, todos
                necesitamos un amigo que nos ayude a encontrar la paz interior.
                PeacePals es ese compañero de paz y diversión que siempre está
                ahí para ti, ofreciendo un refugio digital donde puedes
                relajarte, jugar y redescubrir la alegría en las pequeñas cosas.
              </p>
              <button className="content-button" onClick={handleRegisterClick}>
                Registrarse
              </button>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
