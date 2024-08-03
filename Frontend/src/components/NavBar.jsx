//Implementar los botones

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
