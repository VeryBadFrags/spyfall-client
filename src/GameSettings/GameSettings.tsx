import React, { memo } from "react";
import Card from "../Card";
import ConnectionManager from "../utils/connectionManager";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";
import DisconnectButton from "./DisconnectButton.tsx";

interface GameSettingsProps {
  lobbyStatus: LobbyStatusPayload;
  readyCheck: boolean;
  setReadyCheck: React.Dispatch<React.SetStateAction<boolean>>;
  connectionManager: ConnectionManager;
  disconnectCallback: () => void;
}

const GameSettings = memo(function GameSettings(props: GameSettingsProps) {
  return (
    <Card header="⚙️ Game">
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
});

export default GameSettings;
