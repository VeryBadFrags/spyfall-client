import { create } from "zustand";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";

interface LobbyState {
  lobbyStatus: LobbyStatusPayload;
  setLobbyStatus: (data: LobbyStatusPayload) => void;
}

export const useLobbyStore = create<LobbyState>((set) => ({
  lobbyStatus: { sessionId: "" },
  setLobbyStatus: (data: LobbyStatusPayload) =>
    set(() => {
      return { lobbyStatus: data };
    }),
}));
