import Card from "@components/Card";
import type ConnectionManager from "@utils/connectionManager";
import { FaGear } from "react-icons/fa6";
import DisconnectButton from "./DisconnectButton";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";

interface GameSettingsProps {
	connectionManager: ConnectionManager;
	disconnectCallback: () => void;
}

export default function GameSettings(props: GameSettingsProps) {
	return (
		<Card header="Settings" icon={<FaGear />}>
			<LobbyCode />
			<NewGameForm connectionManager={props.connectionManager} />
			<hr />
			<DisconnectButton disconnectCallback={props.disconnectCallback} />
		</Card>
	);
}
