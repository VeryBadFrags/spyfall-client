import "./Footer.css";

import { FaComments, FaGithub, FaIcons } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pt-5">
      <nav className="navbar navbar-expand-lg sticky-bottom">
        <div className="card rounded-0 container-fluid p-3 fs-5">
          <div className="row row-cols-1 row-cols-lg-2 gy-2">
            <div className="lead fs-6">
              <a
                href="https://github.com/VeryBadFrags/spyfall/issues"
                target="_blank"
                className="link-dark icon-link link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                <FaComments /> Feedback
              </a>
            </div>
            <div className="lead fs-6">
              <a
                href="https://github.com/VeryBadFrags/spyfall"
                target="_blank"
                className="link-dark icon-link link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                <FaGithub /> MIT License
              </a>
            </div>
            <div className="lead fs-6">
              <a
                href="https://www.freepik.com/icon/security_10442065#fromView=search&page=1&position=45&uuid=8ed7406c-1370-434f-b9e1-b24bd1a00d40"
                target="_blank"
                className="link-dark icon-link link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                <FaIcons /> Favicon by LAFS
              </a>
            </div>
            <div className="lead fs-6">
              <a
                href="https://www.buymeacoffee.com/verybadfrags"
                target="_blank"
              >
                <img
                  className="coffee"
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-black.png"
                  alt="Buy Me A Coffee"
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}
