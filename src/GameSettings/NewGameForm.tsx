import React, { useRef } from "react";
import ConnectionManager from "../utils/connectionManager";
import "./NewGameForm.css";
import { EventTypes } from "../types/eventTypes";

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
      connectionManager.send(EventTypes.StartGame);
    } else {
      // TODO printError you are not ready
    }
  };

  return (
    <div>
      <form className="form-inline" onSubmit={handleStartGame}>
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
              const target = event.target as HTMLInputElement;
              connectionManager?.send(EventTypes.ClientReady, {
                ready: target.checked,
              });
              setReadyCheck(target.checked);
            }}
          />
          <label htmlFor="ready-check" className="clickable form-check-label">
            Ready
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-traffic-light" /> Start new round
        </button>
      </form>
    </div>
  );
}
