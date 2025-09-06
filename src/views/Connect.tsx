import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import ConnectionManager from "../utils/connectionManager";
import type { AnyPayload } from "../types/anyPayload.type";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faUser, faDice } from "@fortawesome/free-solid-svg-icons";
import { retrieveCurrentLobby } from "../utils/lobbyHelper";
import {
  useLobbyStore,
  usePlayerNameStore,
  useSessionIdStore,
} from "../store/store";

library.add(faUser, faDice);
const userIcon = icon({ prefix: "fas", iconName: faUser.iconName });
const diceIcon = icon({ prefix: "fas", iconName: faDice.iconName });

interface ConnectProps {
  connectionManager: ConnectionManager;
  onDisconnect: () => void;
  onMessageCallback: (type: string, data: AnyPayload) => void;
}

const Connect = function Connect(props: ConnectProps) {
  const [buttonText, setButtonText] = useState("🏠 Create Lobby");

  const sessionId = useSessionIdStore((state) => state.sessionId);
  const playerName = usePlayerNameStore((state) => state.playerName);
  const setPlayerName = usePlayerNameStore((state) => state.setPlayerName);
  const setSessionId = useSessionIdStore((state) => state.setSessionId);
  const setIsConnected = useLobbyStore((state) => state.setIsConnected);
  const setIsInLobby = useLobbyStore((state) => state.setIsInLobby);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInLobby(true);
    props.connectionManager.joinLobby(
      playerName,
      sessionId,
      props.onDisconnect,
      props.onMessageCallback,
      setIsConnected,
    );
  };

  const handleLobbyCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (target.value) {
      setButtonText("🔌 Join Lobby");
      setSessionId(value.toUpperCase());
    } else {
      setButtonText("🏠 Create Lobby");
      setSessionId(value);
    }
  };

  // Add Lobby ID to URL
  useEffect(() => {
    const lobbyCode = retrieveCurrentLobby();
    console.log("Retrieved lobby code:", lobbyCode);
    if (lobbyCode) {
      setButtonText("🔌 Join Lobby");
      setSessionId(lobbyCode);
    }
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="player-name" className="form-label">
            {Parser(userIcon.html.toString())} Player name
          </label>
          <input
            id="player-name"
            type="text"
            className="form-control"
            required
            autoFocus
            autoComplete="on"
            maxLength={16}
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        {/* Lobby input */}
        <div className="mb-3">
          <label htmlFor="lobby-input" className="form-label">
            {Parser(diceIcon.html.toString())} Lobby code
          </label>
          <input
            id="lobby-input"
            type="text"
            className="form-control"
            pattern="[A-Za-z0-9]*"
            title="Lobby Code (alphanumeric)"
            placeholder="(Optional)"
            minLength={0}
            maxLength={8}
            autoComplete="off"
            value={sessionId}
            onChange={handleLobbyCodeChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default Connect;
