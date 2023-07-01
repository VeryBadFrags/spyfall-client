import React from "react";
import Card from "../Card";
import { LobbyStatusType } from "../Types";
import ConnectionManager from "../utils/connection-manager";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";

interface GameSettingsProps {
  lobbyStatus: LobbyStatusType;
  readyCheck: boolean;
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  connectionManager: ConnectionManager;
  disconnectCallback: () => void;
}

export default function GameSettings(props: GameSettingsProps) {
  return (
    <Card className="border-secondary" header="⚙️ Settings">
      <LobbyCode lobbyStatus={props.lobbyStatus} />
      <NewGameForm
        readyCheck={props.readyCheck}
        setReadyCheck={props.setReadyCheck}
        connectionManager={props.connectionManager}
      />
      <hr />
      <DisconnectButton disconnectCallback={props.disconnectCallback} />
    </Card>
  );
}

interface DisconnectButtonProps {
  disconnectCallback: () => void;
}

function DisconnectButton({ disconnectCallback }: DisconnectButtonProps) {
  return (
    <div className="d-grid">
      <button
        className="btn btn-sm btn-danger"
        onClick={() => disconnectCallback()}
      >
        <i className="fas fa-sign-out-alt" /> Leave lobby
      </button>
    </div>
  );
}
