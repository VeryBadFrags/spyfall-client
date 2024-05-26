import type { ChatPayload } from "./chatPayload.type";
import type { LobbyStatusPayload } from "./lobbyStatus.type";
import type { GamePayload } from "./socketPayload.type";

export type AnyPayload = ChatPayload | GamePayload | LobbyStatusPayload;
