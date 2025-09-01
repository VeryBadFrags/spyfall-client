import Card from "../components/Card.tsx";
import ConnectionManager from "../utils/connectionManager";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";
import DisconnectButton from "./DisconnectButton.tsx";

interface GameSettingsProps {
  connectionManager: ConnectionManager;
  disconnectCallback: () => void;
}

const GameSettings = function GameSettings(props: GameSettingsProps) {
  return (
    <Card header="⚙️ Game">
      <LobbyCode />
      <NewGameForm connectionManager={props.connectionManager} />
      <hr />
      <DisconnectButton disconnectCallback={props.disconnectCallback} />
    </Card>
  );
};

export default GameSettings;
