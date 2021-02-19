import io from "socket.io-client";

export default class ConnectionManager {
  constructor() {
    this.socket = null;
  }

  connect = (
    playerName,
    sessionId,
    connectionEstablishedCallback,
    connectionClosedCallback,
    onMessageCallback
  ) => {
    if (window.location.hostname === "localhost") {
      this.socket = io("http://localhost:8081");
    } else {
      this.socket = io("https://limitless-temple-26784.herokuapp.com");
    }

    this.initSession(playerName, sessionId);
    connectionEstablishedCallback();

    this.socket.on("disconnect", () => {
      console.log("Connection closed");
      connectionClosedCallback();
    });

    this.socket.on("message", (msg) => {
      onMessageCallback(msg.type, msg);
    });
  };

  disconnect = () => {
    this.socket.disconnect();
  };

  initSession(playerName, sessionId) {
    this.send("join-session", {
      sessionId: sessionId,
      playerName: playerName,
      game: "spy",
    });
  }

  send(type, data) {
    this.socket.emit(type, data);
  }
}
