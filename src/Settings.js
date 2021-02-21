import { useRef } from "react";

function Settings(props) {
  const readyRef = useRef();

  const handleStartGame = (event) => {
    event.preventDefault();
    if (readyRef.current.checked) {
      props.connectionManager.send("start-game");
    } else {
      // TODO printError you are not ready
    }
  };

  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-secondary shadow">
          <div className="card-header">
            <i class="fas fa-cog"></i> Settings
          </div>
          <div className="card-body">
            {/* Lobby code */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-auto">
                <label htmlFor="lobby-display" className="col-form-label">
                  <i class="fas fa-building"></i> Lobby
                </label>
              </div>
              <div className="col-auto">
                <input
                  id="lobby-display"
                  type="text"
                  className="form-control"
                  readOnly
                  value={props.lobbyStatus?.sessionId}
                />
              </div>
            </div>

            {/* Players list */}
            <h6 className="card-title">
              <i class="fas fa-users"></i> Players
            </h6>
            <ul className="list">
              {props.lobbyStatus?.peers.clients.map((client) => {
                return (
                  <li
                    className="clickable"
                    key={client.name}
                    onClick={(e) => {
                      e.target.classList.contains("strike")
                        ? e.target.classList.remove("strike")
                        : e.target.classList.add("strike");
                    }}
                  >
                    {client.name}
                    {client.ready ? " ✅" : ""}
                  </li>
                );
              })}
            </ul>

            <hr />

            <p className="card-title">
              <i class="fas fa-flag-checkered"></i> New Game
            </p>
            <form onSubmit={handleStartGame}>
              <div className="form-check form-switch mb-3">
                <input
                  id="ready-check"
                  className="form-check-input"
                  type="checkbox"
                  name="ready-check"
                  required
                  autoComplete="off"
                  checked={props.readyCheck}
                  ref={readyRef}
                  onClick={(event) => {
                    props.connectionManager.send("player-ready", {
                      ready: event.target.checked,
                    });
                    props.setReadyCheck(event.target.checked);
                  }}
                />
                <label
                  htmlFor="ready-check"
                  className="clickable form-check-label"
                >
                  Ready
                </label>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  <i class="fas fa-traffic-light"></i> Start new round
                </button>
              </div>
            </form>
            <hr />
            <div className="d-grid">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={(e) => props.connectionManager.disconnect()}
              >
                <i class="fas fa-sign-out-alt"></i> Leave lobby
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Settings;
