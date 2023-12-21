import io, { Socket } from "socket.io-client";
import { EventTypes } from "../types/eventTypes";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";
import { ChatPayload } from "../types/chatPayload.type";
import { GamePayload } from "../types/socketPayload.type";

export default class ConnectionManager {
  socket: Socket | null;

  constructor() {
    this.socket = null;
    // this.initSocket();
  }

  initSocket(setConnectedToServer: (connected: boolean) => void) {
    if (!this.socket) {
      if (window.location.hostname === "localhost") {
        this.socket = io("http://localhost:8081");
      } else {
        this.socket = io("https://spyfall-server.onrender.com"); // TODO move to configuration
      }
    }

    this.socket.on(EventTypes.Connect, () => {
      setConnectedToServer(this.socket?.connected ?? false);
    });
    this.socket.on(EventTypes.Disconnect, () => {
      // TODO show error instead
      // setConnectedToServer(this.socket.connected);
    });

    this.socket.connect();
  }

  joinLobby(
    playerName: string,
    sessionId: string,
    connectionClosedCallback: () => void,
    onMessageCallback: (type: string, data: any) => void,
    setConnectedToServer: (connected: boolean) => void,
  ) {
    this.initSocket(setConnectedToServer);
    this.send(EventTypes.ClientJoinSession, {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });

    this.socket?.on(EventTypes.Disconnect, () => {
      // this.socket = null;
      connectionClosedCallback();
    });

    this.socket?.on(EventTypes.StartGame, (msg: GamePayload) => {
      onMessageCallback(EventTypes.StartGame, msg);
    });

    this.socket?.on(EventTypes.SessionBroadcast, (msg: LobbyStatusPayload) => {
      onMessageCallback(EventTypes.SessionBroadcast, msg);
    });

    this.socket?.on(EventTypes.SessionCreated, (msg: LobbyStatusPayload) => {
      onMessageCallback(EventTypes.SessionCreated, msg);
    });

    this.socket?.on(EventTypes.ChatEvent, (msg: ChatPayload) => {
      onMessageCallback(EventTypes.ChatEvent, msg);
    });
  }

  disconnect() {
    this.socket?.disconnect();
    // this.socket = null;
  }

  send(type: string, data?: unknown) {
    this.socket?.emit(type, data);
  }
}
