import type { ChatPayload } from "./chatPayload.type";
import type { LobbyStatusPayload } from "./lobbyStatus.type";
import type { GamePayload } from "./gamePayload.type";
import { TimePayload } from "./timePayload.type";

export type AnyPayload =
  | ChatPayload
  | GamePayload
  | LobbyStatusPayload
  | TimePayload;
