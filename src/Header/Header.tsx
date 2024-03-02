import "./Header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-secondary shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-user-secret" /> Spyfall
        </span>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="https://games.verybadfrags.com" target="_blank">
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
