import "./Footer.css";

function Footer() {
  return (
    <footer className="navbar navbar-light bg-light border-dark border-top rounded-0 pt-3 pb-4">
      <div className="container">
        <div className="row gy-2">
          <div className="lead">
            <i className="fas fa-tree" /> No internet? Play{" "}
            <a href="https://offline-spy.verybadfrags.com" target="_blank">
              📵🕵️&nbsp;Offline&nbsp;Spyfall
            </a>
          </div>
          <div className="lead">
            <i className="far fa-comments" /> Suggestions, Feedback?{" "}
            <a href="mailto:spy@verybadfrags.com">spy@verybadfrags.com</a>
          </div>
          {/* <div className="lead">
            <i className="fas fa-code" /> Source code on GitHub{" "}
            <a
              href="https://github.com/VeryBadFrags/spyfall-client"
              target="_blank"
            >
              <i className="fas fa-mobile-alt" />
              &nbsp;Client
            </a>{" "}
            ·{" "}
            <a
              href="https://github.com/VeryBadFrags/spyfall-server"
              target="_blank"
            >
              <i className="fas fa-server" />
              &nbsp;Server
            </a>
          </div> */}
          <div className="lead">
            <i className="far fa-heart" /> Like this game?{" "}
            <a href="https://www.buymeacoffee.com/verybadfrags" target="_blank">
              <img
                className="coffee"
                src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                alt="Buy Me A Coffee"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
