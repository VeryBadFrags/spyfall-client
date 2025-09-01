import { useSessionIdStore } from "../utils/store";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
library.add(faBuilding);
const buildingIcon = icon({ prefix: "fas", iconName: faBuilding.iconName });

const LobbyCode = function LobbyCode() {
  const sessionId = useSessionIdStore((state) => state.sessionId);

  return (
    <div className="mb-3">
      <label htmlFor="lobby-display mr-3" className="form-label">
        {Parser(buildingIcon.html.toString())} Lobby&nbsp;
      </label>
      <span
        id="lobby-code-badge"
        className="border border-secondary-subtle rounded-1 p-1 fs-5"
        data-bs-toggle="popover"
        data-bs-trigger="hover focus"
        data-bs-content="Copy"
        onClick={(event) => {
          window?.getSelection()?.selectAllChildren(event.target as Node);
          navigator.clipboard.writeText(sessionId).then();
        }}
      >
        {sessionId}
      </span>
    </div>
  );
};

export default LobbyCode;
