import React from "react";
import "./Header.css";

function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-user-secret" /> Spyfall
        </span>
        <div className="navbar-nav me-auto mb-2 mb-lg-0">
          <a
            href="https://games.verybadfrags.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-gamepad" /> More games
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
