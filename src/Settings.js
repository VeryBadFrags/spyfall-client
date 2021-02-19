function Settings(props) {
  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-secondary shadow">
          <div className="card-header">⚙️ Settings</div>
          <div className="card-body">
            {/* Lobby code */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-auto">
                <label for="lobby-display" className="col-form-label">
                  Lobby
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  readonly
                />
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
                  autocomplete="off"
                />
                <label for="ready-check" className="clickable form-check-label">
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
                type="submit"
                className="btn btn-sm btn-outline-danger"
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
