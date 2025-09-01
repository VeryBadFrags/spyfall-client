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

interface playerNameState {
  playerName: string;
  setPlayerName: (playerName: string) => void;
}
export const usePlayerNameStore = create<playerNameState>()(
  persist(
    (set) => ({
      playerName: "",
      setPlayerName: (playerName: string) =>
        set(() => {
          return { playerName: playerName };
        }),
    }),
    {
      name: "player-name-storage",
    }
  )
);

interface LobbyState {
  /** If the player is connected to the backend */
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  /** If the player has joined a lobby */
  isInLobby: boolean;
  setIsInLobby: (inLobby: boolean) => void;
  /** If the game has started */
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  /** If the current player is ready to start a new game */
  isPlayerReady: boolean;
  setIsPlayerReady: (ready: boolean) => void;
  /** The list of players in the lobby */
  peers: Array<ClientData>;
  setPeers: (peers: Array<ClientData>) => void;
  /** The current location for the active round */
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
}
export const useLobbyStore = create<LobbyState>((set) => ({
  isConnected: false,
  setIsConnected: (connected: boolean) =>
    set((state) => {
      return { ...state, isConnected: connected };
    }),
  isInLobby: false,
  setIsInLobby: (inLobby: boolean) =>
    set((state) => {
      return { ...state, isInLobby: inLobby };
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
  currentLocation: "",
  setCurrentLocation: (location: string) =>
    set((state) => {
      return { ...state, currentLocation: location };
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
