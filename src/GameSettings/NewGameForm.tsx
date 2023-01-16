import React, { useRef } from "react";
import ConnectionManager from "../utils/connection-manager";

interface NewGameFormProps {
  readyCheck: boolean;
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  connectionManager: ConnectionManager;
}

export default function NewGameForm({
  readyCheck,
  setReadyCheck,
  connectionManager,
}: NewGameFormProps) {
  const readyRef: any = useRef();

  const handleStartGame = (event: React.FormEvent<HTMLFormElement>) => {
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
        <i className="fas fa-flag-checkered" /> New Game
      </p>
      <form onSubmit={handleStartGame}>
        <div className="form-check form-switch mb-3">
          <input
            id="ready-check"
            className="form-check-input"
            style={{ cursor: "pointer" }}
            type="checkbox"
            name="ready-check"
            required
            autoComplete="off"
            checked={readyCheck}
            ref={readyRef}
            onChange={() => {}}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              connectionManager?.send("player-ready", {
                ready: target.checked,
              });
              setReadyCheck(target.checked);
            }}
          />
          <label htmlFor="ready-check" className="clickable form-check-label">
            Ready
          </label>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-traffic-light" /> Start new round
          </button>
        </div>
      </form>
    </div>
  );
}
