import React from "react";
import { useNavigate } from "react-router-dom";
import "./aboutus.css";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <h1>Peacepals</h1>
      <p>
        Nuestra app se creó para poder darle un alivio a las personas que están
        pasando por momentos difíciles.
      </p>
      <div className="team">
        <div className="member">
          <img src= "../public/Images/Adri.jpeg" />
          <h3>Adriana Rogel </h3>
          <p>Encargada de las conexiones de las interfaces de la página</p>
        </div>
        <div className="member">
          <img src="../public/Images/Mateo.jpeg" />
          <h3>Mateo Saenz</h3>
          <p>Encargado del diseño responsive y estética de la página.</p>
        </div>
        <div className="member">
          <img src="../public/Images/Joss.jpeg" />
          <h3>Josselyn Simbaña</h3>
          <p>Encargada del diseño del juego y estética de la página</p>
        </div>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Volver
      </button>
    </div>
  );
};

export default AboutUs;
