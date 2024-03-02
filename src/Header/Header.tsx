import "./Header.scss";

function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-user-secret" /> Spyfall
        </span>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link icon-link"
                href="https://games.verybadfrags.com"
                target="_blank"
              >
                <i className="fas fa-gamepad" /> More games
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
