import io from "socket.io-client";
import { SocketPayload } from "../Types";

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

    this.socket.on("connect", () => {
      setConnectedToServer(this.socket.connected);
    });
    this.socket.on("disconnect", () => {
      // TODO show error instead
      // setConnectedToServer(this.socket.connected);
    });

    this.socket.connect();
  }

  joinLobby(
    playerName: string,
    sessionId: string,
    connectionClosedCallback: () => void,
    onMessageCallback: (type: string, data: SocketPayload) => void,
    setConnectedToServer: (connected: boolean) => void
  ) {
    this.initSocket(setConnectedToServer);
    this.send("join-session", {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });

    this.socket.on("disconnect", () => {
      this.socket = null;
      connectionClosedCallback();
    });

    this.socket.on("start-game", (msg: any) => {
      onMessageCallback("start-game", msg);
    });

    this.socket.on("session-broadcast", (msg: any) => {
      onMessageCallback("session-broadcast", msg);
    });

    this.socket.on("session-created", (msg: any) => {
      onMessageCallback("session-created", msg);
    });

    this.socket.on("chat-event", (msg: any) => {
      onMessageCallback("chat-event", msg);
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
