import { LobbyStatusPayload } from "../types/lobbyStatus.type";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
library.add(faBuilding);
const buildingIcon = icon({ prefix: "fas", iconName: faBuilding.iconName });

interface LobbyCodeProps {
  lobbyStatus: LobbyStatusPayload;
}

export default function LobbyCode({ lobbyStatus }: LobbyCodeProps) {
  return (
    <div className="mb-3">
      <label htmlFor="lobby-display" className="form-label">
        {Parser(buildingIcon.html.toString())} Lobby
      </label>
      <input
        id="lobby-display"
        type="text"
        className="form-control"
        readOnly
        value={lobbyStatus?.sessionId ? (lobbyStatus.sessionId as string) : ""}
      />
    </div>
  );
}
