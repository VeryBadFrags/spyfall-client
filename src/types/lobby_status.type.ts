import { ClientType } from "./client.type";

export type LobbyStatusType = {
  sessionId?: String;
  /** List of other players */
  peers?: Array<ClientType>;
};
