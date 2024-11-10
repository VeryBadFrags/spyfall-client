import "./Footer.css";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faTree,
  faComments,
  faCode,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(faTree, faComments, faCode, faHeart, faGithub);
const treeIcon = icon({ prefix: "fas", iconName: faTree.iconName });
const codeIcon = icon({ prefix: "fas", iconName: faCode.iconName });
const commentsIcon = icon({ prefix: "fas", iconName: faComments.iconName });
const heartIcon = icon({ prefix: "fas", iconName: faHeart.iconName });
const githubIcon = icon({ prefix: "fab", iconName: faGithub.iconName });

function Footer() {
  return (
    <footer className="pt-5">
      <nav className="navbar navbar-expand-lg sticky-bottom">
        <div className="card-body container-fluid p-3 fs-5">
          <div className="row row-cols-1 row-cols-lg-2 gy-2">
            <div className="lead fs-6">
              {Parser(treeIcon.html.toString())} No internet? Play{" "}
              <a
                className="icon-link link-offset-1"
                href="https://offline-spy.verybadfrags.com"
                target="_blank"
              >
                📵🕵️ Offline Spyfall
              </a>
            </div>
            <div className="lead fs-6">
              {Parser(commentsIcon.html.toString())} Suggestions, Feedback?{" "}
              <a href="mailto:spy@verybadfrags.com">spy@verybadfrags.com</a>
            </div>
            <div className="lead fs-6">
              {Parser(codeIcon.html.toString())} MIT License{" "}
              <a href="https://github.com/VeryBadFrags/spyfall" target="_blank">
                {Parser(githubIcon.html.toString())} Source code on GitHub
              </a>
            </div>
            <div className="lead fs-6">
              {Parser(heartIcon.html.toString())} Like this game?{" "}
              <a
                href="https://www.buymeacoffee.com/verybadfrags"
                target="_blank"
              >
                <img
                  className="coffee"
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                  alt="Buy Me A Coffee"
                />
              </a>
            </div>
            <div className="lead fs-6">
              <a href="https://www.freepik.com/icon/security_10442065#fromView=search&page=1&position=45&uuid=8ed7406c-1370-434f-b9e1-b24bd1a00d40">
                Icon by LAFS
              </a>
            </div>
          </div>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
