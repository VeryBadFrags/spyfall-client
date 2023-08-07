import { ClientType } from "../types/client.type";

export interface SocketPayload {
  sessionId: string;

  message: string;
  color?: string;
  /** The author of the message */
  author?: string;

  /** The player who goes first */
  first?: string;
  /** If the player is the spy */
  spy?: boolean;
  /** The current location */
  location: string;
  /** List of all locations */
  locations: Array<string>;
}
