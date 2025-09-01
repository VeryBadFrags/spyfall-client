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
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  isPlayerReady: boolean;
  setIsPlayerReady: (ready: boolean) => void;
  peers: Array<ClientData>;
  setPeers: (peers: Array<ClientData>) => void;
}
export const useLobbyStore = create<LobbyState>((set) => ({
  isConnected: false,
  setIsConnected: (connected: boolean) =>
    set((state) => {
      return { ...state, isConnected: connected };
    }),
  gameStarted: false,
  setGameStarted: (started: boolean) =>
    set((state) => {
      return { ...state, gameStarted: started };
    }),
  isPlayerReady: false,
  setIsPlayerReady: (ready: boolean) =>
    set((state) => {
      return { ...state, isPlayerReady: ready };
    }),
  peers: new Array<ClientData>(),
  setPeers: (peers: Array<ClientData>) =>
    set((state) => {
      return { ...state, peers: peers };
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
