import { useState } from "react";

function Connect(props) {
  const [playerName, setPlayerName] = useState("");
  const [lobbyID, setLobbyID] = useState("");
  const [buttonText, setButtonText] = useState("🏠 Create Lobby");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.connectionManager.connect(
      playerName,
      lobbyID,
      props.onConnect,
      props.onDisconnect
    );
  };

  const editCode = (event) => {
    let value = event.target.value;
    if (event.target.value) {
      setButtonText("🔌 Join Lobby");
      setLobbyID(value.toUpperCase());
    } else {
      setButtonText("🏠 Create Lobby");
    }
  };

  if (!props.gameMode) {
    return (
      <div className="col">
        <div className="card text-dark bg-light border-primary shadow">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name-input" className="form-label">
                  👤 Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  autoFocus
                  maxLength="16"
                />
              </div>
              {/* Lobby input */}
              <div className="mb-3">
                <label htmlFor="lobby-input" className="form-label">
                  🎲 Lobby code
                </label>
                <input
                  type="text"
                  className="form-control"
                  pattern="[A-Za-z0-9]*"
                  title="Lobby Code"
                  maxLength="8"
                  autoComplete="off"
                  value={lobbyID}
                  onChange={editCode}
                />
              </div>
              <div className="d-grid">
                <button type=" submit" className="btn btn-primary">
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Connect;
