import { useCallback, useRef } from "react";
import "./NewGameForm.scss";
import type ConnectionManager from "@utils/connectionManager";
import { useLobbyStore } from "@store/store";
import { ClientEvent } from "../../../types/clientEvent";
import { FaTrafficLight } from "react-icons/fa";

interface NewGameFormProps {
  connectionManager: ConnectionManager;
}

export default function NewGameForm({ connectionManager }: NewGameFormProps) {
  const readyRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const isPlayerReady = useLobbyStore((state) => state.isPlayerReady);
  const setIsPlayerReady = useLobbyStore((state) => state.setIsPlayerReady);

  const handleStartGame = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (readyRef.current.checked) {
        connectionManager.send(ClientEvent.StartGame);
      } else {
        // TODO printError you are not ready
      }
    },
    [connectionManager],
  );

  return (
    <div>
      <form className="form-inline" onSubmit={handleStartGame}>
        <div className="form-check form-switch fs-5 mb-3">
          <input
            id="ready-check"
            className={
              "form-check-input " + (isPlayerReady ? " bg-success" : null)
            }
            type="checkbox"
            role="switch"
            name="ready-check"
            required
            autoComplete="off"
            checked={isPlayerReady}
            ref={readyRef}
            onChange={() => {}}
            onClick={(event) => {
              const target = event.target as HTMLInputElement;
              connectionManager?.send(ClientEvent.ClientReady, {
                ready: target.checked,
              });
              setIsPlayerReady(target.checked);
            }}
          />
          <label htmlFor="ready-check" className="clickable form-check-label">
            Ready
          </label>
        </div>
        <button type="submit" className="btn btn-primary shadow">
          <FaTrafficLight /> Start new round
        </button>
      </form>
    </div>
  );
}
