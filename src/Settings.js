import { useRef } from "react";

function Settings(props) {
  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-secondary shadow">
          <div className="card-header">
            <i className="fas fa-cog"></i> Settings
          </div>
          <div className="card-body">
            <LobbyCode lobbyStatus={props.lobbyStatus} />
            <PlayersList lobbyStatus={props.lobbyStatus} />
            <hr />
            <NewGameForm
              readyCheck={props.readyCheck}
              setReadyCheck={props.setReadyCheck}
              connectionManager={props.connectionManager}
            />
            <hr />
            <DisconnectButton disconnectCallback={props.disconnectCallback} />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function LobbyCode({ lobbyStatus }) {
  return (
    <div className="row g-3 align-items-center mb-3">
      <div className="col-auto">
        <label htmlFor="lobby-display" className="col-form-label">
          <i className="fas fa-building"></i> Lobby
        </label>
      </div>
      <div className="col-auto">
        <input
          id="lobby-display"
          type="text"
          className="form-control"
          readOnly
          value={lobbyStatus?.sessionId}
        />
      </div>
    </div>
  );
}

function PlayersList({ lobbyStatus }) {
  return (
    <div>
      <h6 className="card-title">
        <i className="fas fa-users"></i> Players
      </h6>
      <ul className="list-group list-group-flush">
        {lobbyStatus?.peers.clients.map((client) => {
          return (
            <li
              className="list-group-item clickable"
              key={client.name}
              onClick={(e) => {
                e.target.classList.contains("strike")
                  ? e.target.classList.remove("strike")
                  : e.target.classList.add("strike");
              }}
            >
              {client.name} {client.ready ? " ✅" : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function NewGameForm({ readyCheck, setReadyCheck, connectionManager }) {
  const readyRef = useRef();

  const handleStartGame = (event) => {
    event.preventDefault();
    if (readyRef.current.checked) {
      connectionManager.send("start-game");
    } else {
      // TODO printError you are not ready
    }
  };

  return (
    <div>
      <p className="card-title">
        <i className="fas fa-flag-checkered"></i> New Game
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
            checked={readyCheck}
            ref={readyRef}
            onChange={() => {}}
            onClick={(event) => {
              connectionManager?.send("player-ready", {
                ready: event.target.checked,
              });
              setReadyCheck(event.target.checked);
            }}
          />
          <label htmlFor="ready-check" className="clickable form-check-label">
            Ready
          </label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-traffic-light"></i> Start new round
          </button>
        </div>
      </form>
    </div>
  );
}

function DisconnectButton({ disconnectCallback }) {
  return (
    <div className="d-grid">
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={(e) => disconnectCallback()}
      >
        <i className="fas fa-sign-out-alt"></i> Leave lobby
      </button>
    </div>
  );
}

export default Settings;
