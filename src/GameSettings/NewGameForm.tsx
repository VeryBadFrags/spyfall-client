import React, { useRef } from "react";
import ConnectionManager from "../utils/connectionManager";
import "./NewGameForm.scss";
import { EventTypes } from "../types/eventTypes";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faTrafficLight } from "@fortawesome/free-solid-svg-icons";
library.add(faTrafficLight);
const trafficLightIcon = icon({
  prefix: "fas",
  iconName: faTrafficLight.iconName,
});

interface NewGameFormProps {
  readyCheck: boolean;
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  connectionManager: ConnectionManager;
}

function NewGameForm({
  readyCheck,
  setReadyCheck,
  connectionManager,
}: NewGameFormProps) {
  const readyRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
        <div className="form-check form-switch fs-5 mb-3">
          <input
            id="ready-check"
            className={
              "form-check-input " + (readyCheck ? " bg-success" : null)
            }
            type="checkbox"
            role="switch"
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
        <button type="submit" className="btn btn-primary shadow">
          {Parser(trafficLightIcon.html.toString())} Start new round
        </button>
      </form>
    </div>
  );
}

export default NewGameForm;
