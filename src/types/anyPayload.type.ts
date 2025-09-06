import type { ChatPayload } from "./chatPayload.type";
import type { LobbyStatusPayload } from "./lobbyStatus.type";
import type { GamePayload } from "./gamePayload.type";
import type { TimePayload } from "./timePayload.type";

export type AnyPayload =
  | ChatPayload
  | GamePayload
  | LobbyStatusPayload
  | TimePayload;
