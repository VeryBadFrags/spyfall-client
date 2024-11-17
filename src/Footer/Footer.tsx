import "./Footer.css";

import { memo } from "react";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faComments, faIcons } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

library.add(faComments, faGithub, faIcons);
const commentsIcon = icon({ prefix: "fas", iconName: faComments.iconName });
const githubIcon = icon({ prefix: "fab", iconName: faGithub.iconName });
const iconsIcon = icon({ prefix: "fas", iconName: faIcons.iconName });

const Footer = memo(function Footer() {
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
                {Parser(commentsIcon.html.toString())} Feedback
              </a>
            </div>
            <div className="lead fs-6">
              <a
                href="https://github.com/VeryBadFrags/spyfall"
                target="_blank"
                className="link-dark icon-link link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                {Parser(githubIcon.html.toString())} MIT License
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
            <div className="lead fs-6">
              <a
                href="https://www.freepik.com/icon/security_10442065#fromView=search&page=1&position=45&uuid=8ed7406c-1370-434f-b9e1-b24bd1a00d40"
                target="_blank"
                className="link-dark icon-link link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                {Parser(iconsIcon.html.toString())} Favicon by LAFS
              </a>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
});

export default Footer;
