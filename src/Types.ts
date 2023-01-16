export type ChatRowType = {
  text: string;
  author?: string;
  color?: string;
};

export type ClientType = {
  id: string;
  name: string;
  ready: boolean;
}

export type LobbyStatusType = {
  sessionId?: String;
  peers?: Array<ClientType>;
};

