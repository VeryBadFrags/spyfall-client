import io, { Socket } from "socket.io-client";
import { ServerEvent } from "../types/serverEvent";
import type { LobbyStatusPayload } from "../types/lobbyStatus.type";
import type { ChatPayload } from "../types/chatPayload.type";
import type { GamePayload } from "../types/gamePayload.type";
import type { AnyPayload } from "../types/anyPayload.type";
import { TimePayload } from "../types/timePayload.type";
import { ClientEvent } from "../types/clientEvent";

export default class ConnectionManager {
  socket: Socket | null;

  constructor() {
    this.socket = null;
    // this.initSocket();
  }

  initSocket(setConnectedToServer: (connected: boolean) => void) {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_API_URL);
    }

    this.socket.on(ClientEvent.Connect, () => {
      setConnectedToServer(this.socket?.connected ?? false);
    });
    this.socket.on(ClientEvent.Disconnect, () => {
      // TODO show error instead
      // setConnectedToServer(this.socket.connected);
    });

    this.socket.connect();
  }

  joinLobby(
    playerName: string,
    sessionId: string,
    connectionClosedCallback: () => void,
    onMessageCallback: (type: string, data: AnyPayload) => void,
    setConnectedToServer: (connected: boolean) => void,
  ) {
    this.initSocket(setConnectedToServer);
    this.send(ClientEvent.JoinSession, {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });

    this.socket?.on(ClientEvent.Disconnect, () => {
      // this.socket = null;
      connectionClosedCallback();
    });

    this.socket?.on(ServerEvent.StartGame, (msg: GamePayload) => {
      onMessageCallback(ServerEvent.StartGame, msg);
    });

    this.socket?.on(ServerEvent.SessionBroadcast, (msg: LobbyStatusPayload) => {
      onMessageCallback(ServerEvent.SessionBroadcast, msg);
    });

    this.socket?.on(ServerEvent.SessionCreated, (msg: LobbyStatusPayload) => {
      onMessageCallback(ServerEvent.SessionCreated, msg);
    });

    this.socket?.on(ServerEvent.ChatEvent, (msg: ChatPayload) => {
      onMessageCallback(ServerEvent.ChatEvent, msg);
    });

    this.socket?.on(ServerEvent.Time, (msg: TimePayload) => {
      onMessageCallback(ServerEvent.Time, msg);
    });
  }

  disconnect() {
    this.socket?.disconnect();
    // this.socket = null;
  }

  send(type: ClientEvent, data?: unknown) {
    this.socket?.emit(type, data);
  }
}
