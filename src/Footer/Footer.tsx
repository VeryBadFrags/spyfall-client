import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="card fixed-bottom d-inline-block rounded-0">
        <div className="card-body p-3">
          <div className="row row-cols-1 row-cols-lg-2 gy-2">
            <div className="lead">
              <i className="fas fa-tree" /> No internet? Play{" "}
              <a
                className="icon-link link-offset-1"
                href="https://offline-spy.verybadfrags.com"
                target="_blank"
              >
                📵🕵️ Offline Spyfall
              </a>
            </div>
            <div className="lead">
              <i className="far fa-comments" /> Suggestions, Feedback?{" "}
              <a href="mailto:spy@verybadfrags.com">spy@verybadfrags.com</a>
            </div>
            <div className="lead">
              <i className="fas fa-code" /> MIT License{" "}
              <a href="https://github.com/VeryBadFrags/spyfall" target="_blank">
                <i className="fab fa-github" /> Source code on GitHub
              </a>
            </div>
            <div className="lead">
              <i className="far fa-heart" /> Like this game?{" "}
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
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
