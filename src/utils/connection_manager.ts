import io from "socket.io-client";
import { SocketPayload } from "../interfaces/socket_payload.interface";
import { EventTypes } from "../types/event_types";
import { LobbyStatusType } from "../types/lobby_status.type";

export default class ConnectionManager {
  socket: any;

  constructor() {
    this.socket = null;
    // this.initSocket();
  }

  initSocket(setConnectedToServer: (connected: boolean) => void) {
    if (!this.socket) {
      if (window.location.hostname === "localhost") {
        this.socket = io("http://localhost:8081");
      } else {
        this.socket = io("https://spyfall-server.onrender.com");
      }
    }

    this.socket.on(EventTypes.Connect, () => {
      setConnectedToServer(this.socket.connected);
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
    setConnectedToServer: (connected: boolean) => void
  ) {
    this.initSocket(setConnectedToServer);
    this.send(EventTypes.ClientJoinSession, {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });

    this.socket.on(EventTypes.Disconnect, () => {
      this.socket = null;
      connectionClosedCallback();
    });

    this.socket.on(EventTypes.StartGame, (msg: SocketPayload) => {
      onMessageCallback(EventTypes.StartGame, msg);
    });

    this.socket.on(EventTypes.SessionBroadcast, (msg: LobbyStatusType) => {
      onMessageCallback(EventTypes.SessionBroadcast, msg);
    });

    this.socket.on(EventTypes.SessionCreated, (msg: any) => {
      onMessageCallback(EventTypes.SessionCreated, msg);
    });

    this.socket.on(EventTypes.ChatEvent, (msg: any) => {
      onMessageCallback(EventTypes.ChatEvent, msg);
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.socket = null;
  }

  send(type: string, data?: any) {
    this.socket.emit(type, data);
  }
}
