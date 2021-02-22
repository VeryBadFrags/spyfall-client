function Footer() {
  return (
    <footer className="navbar navbar-light bg-light border-dark border-top rounded-0 pt-3 pb-4">
      <div className="container">
        <div className="row gy-2">
          <div className="lead">
            <i className="fas fa-tree"></i> No internet? Play
            <a href="https://offline-spy.verybadfrags.com" target="_blank" rel="noopener noreferrer">
              📵🕵️ Offline Spyfall
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
              <i className="fas fa-mobile-alt"></i> Client
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/VeryBadFrags/online-spy-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-server"></i> Server
            </a>
          </div>
          <div className="lead">
            <i className="far fa-heart"></i> Like this game?
            <a
              href="https://www.buymeacoffee.com/verybadfrags"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Support VeryBadFrags
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
