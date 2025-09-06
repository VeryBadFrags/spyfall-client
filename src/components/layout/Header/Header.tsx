import "./Header.scss";
import { FaGamepad, FaUserSecret } from "react-icons/fa";

export default function Header() {
  return (
    <nav className="navbar navbar-expand navbar-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <FaUserSecret /> Spyfall
        </span>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a
                className="nav-link icon-link"
                href="https://blog.verybadfrags.com/games/"
                target="_blank"
              >
                <FaGamepad /> More games
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
