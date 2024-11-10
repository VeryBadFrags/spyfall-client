import {LobbyStatusPayload} from "../types/lobbyStatus.type";

// Font Awesome
import Parser from "html-react-parser";
import {library, icon} from "@fortawesome/fontawesome-svg-core";
import {faBuilding} from "@fortawesome/free-solid-svg-icons";

library.add(faBuilding);
const buildingIcon = icon({prefix: "fas", iconName: faBuilding.iconName});

interface LobbyCodeProps {
    lobbyStatus: LobbyStatusPayload;
}

export default function LobbyCode({lobbyStatus}: LobbyCodeProps) {
    return (
        <div className="mb-3">
            <label htmlFor="lobby-display mr-3" className="form-label">
                {Parser(buildingIcon.html.toString())} Lobby&nbsp;
            </label>
            <span id="lobby-code-badge" className="border border-secondary-subtle rounded-1 p-1 fs-5"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus" data-bs-content="Copy"
                  onClick={(event) => {
                      window?.getSelection()?.selectAllChildren(
                          event.target as Node
                      );
                      navigator.clipboard.writeText(lobbyStatus.sessionId).then();
                  }}>{lobbyStatus?.sessionId ? (lobbyStatus.sessionId) : ""}</span>
        </div>
    );
}
