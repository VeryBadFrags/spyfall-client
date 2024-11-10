export enum EventTypes {
  // Server
  Connect = "connect",
  Disconnect = "disconnect",

  SessionBroadcast = "session-broadcast",
  SessionCreated = "session-created",
  SessionDeleted = "session-deleted",
  
  StartGame = "start-game",
  // Client
  ClientJoinSession = "join-session",
  ClientReady = "player-ready",
  // Both
  ChatEvent = "chat-event",
}
