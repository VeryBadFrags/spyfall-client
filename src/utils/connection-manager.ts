import io from "socket.io-client";
import { SocketPayload } from "../Types";

export default class ConnectionManager {
  socket: any;

  constructor() {
    this.socket = null;
    this.initSocket();
  }

  initSocket() {
    if (!this.socket) {
      if (window.location.hostname === "localhost") {
        this.socket = io("http://localhost:8081");
      } else {
        this.socket = io("https://spyfall-server.onrender.com");
      }
    } else {
      this.socket.connect();
    }
  }

  connect(
    playerName: string,
    sessionId: string,
    connectionClosedCallback: () => void,
    onMessageCallback: (type: string, data: SocketPayload) => void
  ) {
    this.initSocket();
    this.send("join-session", {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });

    this.socket.on("disconnect", () => {
      this.socket = null;
      connectionClosedCallback();
    });

    this.socket.on("message", (msg: any) => {
      onMessageCallback(msg.type, msg);
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
