import React from "react";
import Card from "../Card";
import ConnectionManager from "../utils/connectionManager";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSignOutAlt);
const signOutAltIcon = icon({ prefix: "fas", iconName: faSignOutAlt.iconName });

interface GameSettingsProps {
  lobbyStatus: LobbyStatusPayload;
  readyCheck: boolean;
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  connectionManager: ConnectionManager;
  disconnectCallback: () => void;
}

export default function GameSettings(props: GameSettingsProps) {
  return (
    <Card header="⚙️ Settings">
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
        {Parser(signOutAltIcon.html.toString())} Leave lobby
      </button>
    </div>
  );
}
