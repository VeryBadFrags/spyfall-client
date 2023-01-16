import React from "react";
import { LobbyStatusType } from "../Types";

interface LobbyCodeProps {
  lobbyStatus: LobbyStatusType;
}

export default function LobbyCode({ lobbyStatus }: LobbyCodeProps) {
  return (
    <div className="row g-3 align-items-center mb-3">
      <div className="col-auto">
        <label htmlFor="lobby-display" className="col-form-label">
          <i className="fas fa-building" /> Lobby
        </label>
      </div>
      <div className="col-auto">
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
    </div>
  );
}
