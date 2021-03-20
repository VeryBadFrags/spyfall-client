import React from 'react';

function Footer() {
  return (
    <footer className="navbar navbar-light bg-light border-dark border-top rounded-0 pt-3 pb-4">
      <div className="container">
        <div className="row gy-2">
          <div className="lead">
            <i className="fas fa-tree"></i> No internet? Play{" "}
            <a
              href="https://offline-spy.verybadfrags.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              📵🕵️&nbsp;Offline&nbsp;Spyfall
            </a>
          </div>
          <div className="lead">
            <i className="far fa-comments"></i> Suggestions, Feedback?{" "}
            <a href="mailto:spy@verybadfrags.com">spy@verybadfrags.com</a>
          </div>
          <div className="lead">
            <i className="fas fa-code"></i> Source code on GitHub{" "}
            <a
              href="https://github.com/VeryBadFrags/online-spy-client"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-mobile-alt"></i>&nbsp;Client
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/VeryBadFrags/online-spy-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-server"></i>&nbsp;Server
            </a>
          </div>
          <div className="lead">
            <i className="far fa-heart" /> Like this game?{" "}
            <a
              href="https://www.buymeacoffee.com/verybadfrags"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                alt="Buy Me A Coffee"
                style={{ height: "1.7em" }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
