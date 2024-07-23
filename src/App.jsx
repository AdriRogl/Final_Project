import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Diary from "./Diary";
import Game from "./Game";
import Fpassword from "./Fpassword";
import AboutUs from "./AboutUs";
import "./App.css";

const App = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Redirige a la página principal
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleAboutUsClick = () => {
    navigate("/aboutus");
  };

  return (
    <div className="container">
      <header className="header">
        <nav className="menu">
          <button className="inicio" onClick={handleHomeClick}>
            INICIO
          </button>
          <button className="conocenos" onClick={handleAboutUsClick}>
            CONÓCENOS
          </button>
          <button className="iniciar-sesion" onClick={handleLoginClick}>
            INICIAR SESIÓN
          </button>
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
        <Route path="/" element={<App />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Diary" element={<Diary />} />
        <Route path="/Game" element={<Game />} />
        <Route path="/Fpassword" element={<Fpassword />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default App;
