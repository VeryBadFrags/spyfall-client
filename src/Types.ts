export interface SocketPayload {
  message: string;
  author: string;
  color: string;
  sessionId: string;
  locations: Array<string>;
  spy: boolean; // If the current player is the spy
  location: string; // The current location
  first: string; // The first player to play
}

export type ChatRowType = {
  text: string;
  author?: string;
  color?: string;
};

export type ClientType = {
  id: string;
  name: string;
  ready: boolean;
};

export type LobbyStatusType = {
  sessionId?: String;
  peers?: Array<ClientType>;
};
