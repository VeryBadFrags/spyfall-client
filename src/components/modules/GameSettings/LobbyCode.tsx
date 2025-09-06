import { useSessionIdStore } from "@store/store";
import { FaBuilding } from "react-icons/fa";

export default function LobbyCode() {
  const sessionId = useSessionIdStore((state) => state.sessionId);

  return (
    <div className="mb-2">
      <label htmlFor="lobby-display" className="form-label">
        <FaBuilding /> Lobby&nbsp;
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
}
