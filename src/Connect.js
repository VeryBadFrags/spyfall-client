import { useState } from "react";

function Connect(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [lobbyID, setLobbyID] = useState("");
  const [buttonText, setButtonText] = useState("🏠 Create Lobby");

  const editCode = (event) => {
    let value = event.target.value;
    if (event.target.value) {
      setButtonText("🔌 Join Lobby");
      setLobbyID(value.toUpperCase());
    } else {
      setButtonText("🏠 Create Lobby");
    }
  };

  return (
    <div className="col" id="connect-wrapper">
      <div className="card text-dark bg-light border-primary shadow">
        <div className="card-body">
          <form id="connect-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name-input" className="form-label">
                👤 Name
              </label>
              <input
                type="text"
                id="name-input"
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
                id="lobby-input"
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
              <button
                type=" submit"
                id="create-lobby-button"
                className="btn btn-primary"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connect;
