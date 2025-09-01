import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";

interface LobbyState {
  lobbyStatus: LobbyStatusPayload;
  setLobbyStatus: (data: LobbyStatusPayload) => void;
}

// TODO split session id away and persist only that
export const useLobbyStore = create<LobbyState>()(
  persist(
    (set) => ({
      lobbyStatus: { sessionId: "" },
      setLobbyStatus: (data: LobbyStatusPayload) =>
        set(() => {
          return { lobbyStatus: data };
        }),
    }),
    {
      name: "lobby-storage",
    }
  )
);

interface CrossedState {
  crossedLocations: Set<number>;
  setCrossedLocations: (locations: Set<number>) => void;
}
export const useCrossedStore = create<CrossedState>((set) => ({
  crossedLocations: new Set<number>(),
  setCrossedLocations: (locations: Set<number>) =>
    set((state) => {
      return { ...state, crossedLocations: locations };
    }),
}));