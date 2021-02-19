function Settings(props) {
  function displayPeers(clients) {
    // let peersList = document.getElementById("peers-list");
    // peersList.innerHTML = "";
    // clients
    //   .map((client) => {
    //     let newLine = document.createElement("li");
    //     newLine.classList.add("clickable");
    //     newLine.addEventListener("click", (event) =>
    //       addRemoveClass(event.target, "strike")
    //     );
    //     let ready = client.ready ? " ✅" : "";
    //     newLine.innerText = `${client.name}${ready}`;
    //     return newLine;
    //   })
    //   .forEach((line) => peersList.appendChild(line));
  }

  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-secondary shadow">
          <div className="card-header">⚙️ Settings</div>
          <div className="card-body">
            {/* Lobby code */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-auto">
                <label htmlFor="lobby-display" className="col-form-label">
                  Lobby
                </label>
              </div>
              <div className="col-auto">
                <input type="text" className="form-control" readOnly />
              </div>
            </div>

            {/* Players list */}
            <h6 className="card-title">👥 Players</h6>
            <ul className="list"></ul>

            <hr />

            <p className="card-title">🏁 New Game</p>
            <form>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="ready-check"
                  required
                  autoComplete="off"
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
                  🚦 Start new round
                </button>
              </div>
            </form>
            <hr />
            <div className="d-grid">
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={(e) => props.disconnectCallback()}
              >
                ⬅️ Leave lobby
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
