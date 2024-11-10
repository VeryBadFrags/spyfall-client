import "./Header.scss";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
library.add(faUserSecret, faGamepad);
const userSecretIcon = icon({ prefix: "fas", iconName: faUserSecret.iconName });
const gamePadIcon = icon({ prefix: "fas", iconName: faGamepad.iconName });

const Header = memo(function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          {Parser(userSecretIcon.html.toString())} Spyfall
        </span>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link icon-link"
                href="https://blog.verybadfrags.com/games/"
                target="_blank"
              >
                {Parser(gamePadIcon.html.toString())} More games
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Header;
