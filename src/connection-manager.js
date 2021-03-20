import io from "socket.io-client";

export default class ConnectionManager {
  constructor() {
    this.socket = null;
    this.initSocket();
  }

  initSocket() {
    if (!this.socket) {
      if (window.location.hostname === "localhost") {
        this.socket = io("http://localhost:8081");
      } else {
        this.socket = io("https://limitless-temple-26784.herokuapp.com");
      }
    } else {
      this.socket.connect();
    }
  }

  connect(playerName, sessionId, connectionClosedCallback, onMessageCallback) {
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

    this.socket.on("message", (msg) => {
      onMessageCallback(msg.type, msg);
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.socket = null;
  }

  send(type, data) {
    this.socket.emit(type, data);
  }
}
