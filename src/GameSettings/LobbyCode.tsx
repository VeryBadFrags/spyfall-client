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
      <label htmlFor="lobby-display mx-3" className="form-label">
        {Parser(buildingIcon.html.toString())} Lobby:&nbsp;
      </label>
        <span className="badge rounded-pill bg-info fs-5">{lobbyStatus?.sessionId ? (lobbyStatus.sessionId as string) : ""}</span>
    </div>
  );
}
