import { LobbyStatusPayload } from "../types/lobbyStatus.type";

interface LobbyCodeProps {
  lobbyStatus: LobbyStatusPayload;
}

export default function LobbyCode({ lobbyStatus }: LobbyCodeProps) {
  return (
    <div className="mb-3">
        <label htmlFor="lobby-display" className="form-label">
          <i className="fas fa-building" /> Lobby
        </label>
        <input
          id="lobby-display"
          type="text"
          className="form-control"
          readOnly
          value={
            lobbyStatus?.sessionId ? (lobbyStatus.sessionId as string) : ""
          }
        />
    </div>
  );
}
