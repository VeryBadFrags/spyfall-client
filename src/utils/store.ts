import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ClientData } from "../types/clientData.type";

interface sessionIdState {
  sessionId: string;
  setSessionId: (id: string) => void;
}
export const useSessionIdStore = create<sessionIdState>()(
  persist(
    (set) => ({
      sessionId: "",
      setSessionId: (id: string) =>
        set(() => {
          return { sessionId: id };
        }),
    }),
    {
      name: "session-id-storage",
    }
  )
);

interface LobbyState {
  peers: Array<ClientData>;
  setPeers: (peers: Array<ClientData>) => void;
}
export const useLobbyStore = create<LobbyState>((set) => ({
  peers: new Array<ClientData>(),
  setPeers: (peers: Array<ClientData>) =>
    set((state) => {
      return {...state, peers: peers };
    }),
}));

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
