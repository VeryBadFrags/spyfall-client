function Settings(props) {
  if (props.gameMode) {
    return (
      <div class="col" id="players-wrapper">
        <div class="card border-secondary shadow">
          <div class="card-header">⚙️ Settings</div>
          <div class="card-body">
            {/* Lobby code */}
            <div class="row g-3 align-items-center mb-3">
              <div class="col-auto">
                <label for="lobby-display" class="col-form-label">
                  Lobby
                </label>
              </div>
              <div class="col-auto">
                <input
                  type="text"
                  class="form-control"
                  id="lobby-display"
                  readonly
                />
              </div>
            </div>

            {/* Players list */}
            <h6 class="card-title">👥 Players</h6>
            <ul id="peers-list" class="list"></ul>

            <hr />

            <p class="card-title">🏁 New Game</p>
            <form id="new-game-form">
              <div class="form-check form-switch mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ready-check"
                  name="ready-check"
                  required
                  autocomplete="off"
                />
                <label for="ready-check" class="clickable form-check-label">
                  Ready
                </label>
              </div>
              <div class="d-grid">
                <button type="submit" id="start-button" class="btn btn-primary">
                  🚦 Start new round
                </button>
              </div>
            </form>
            <hr />
            <div class="d-grid">
              <button
                type="submit"
                id="leave-lobby-button"
                class="btn btn-sm btn-outline-danger"
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
