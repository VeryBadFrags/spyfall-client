import { useEffect, useState } from "react";
import Card from "@components/Card";
import type ConnectionManager from "@utils/connectionManager";
import type { AnyPayload } from "../types/anyPayload.type";
import {
  useLobbyStore,
  usePlayerNameStore,
  useSessionIdStore,
} from "@store/store";
import { retrieveCurrentLobby } from "@utils/lobbyHelper";
import { FaDice, FaUser } from "react-icons/fa";

interface ConnectProps {
  connectionManager: ConnectionManager;
  onDisconnect: () => void;
  onMessageCallback: (type: string, data: AnyPayload) => void;
}

export default function ConnectBox(props: ConnectProps) {
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
            <FaUser /> <span>Player name</span>
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
            <FaDice /> <span>Lobby code</span>
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
}
