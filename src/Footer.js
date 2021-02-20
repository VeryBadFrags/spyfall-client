function Footer() {
  return (
    <footer className="navbar navbar-light bg-light border-dark border-top rounded-0 pt-3 pb-4">
      <div className="container">
        <div className="row gy-2">
          <div className="lead">
            No internet? Play
            <a href="https://offline-spy.verybadfrags.com" target="_blank">
              📵🕵️ Offline Spyfall
            </a>
          </div>
          <div className="lead">
            Suggestions, Feedback?{" "}
            <a href="mailto:spy@verybadfrags.com">spy@verybadfrags.com</a>
          </div>
          <div className="lead">
            <a
              href="https://github.com/VeryBadFrags/online-spy-client"
              target="_blank"
              rel="noopener noreferrer"
            >
              💾 Source code on GitHub
            </a>
          </div>
          <div className="lead">
            Like this game?
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
