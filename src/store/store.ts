import type { ClientData } from "../types/clientData.type";
import type { LocationData } from "../types/locationData.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    },
  ),
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
    },
  ),
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
  locations: Array<LocationData>;
  setLocations: (locations: Array<LocationData>) => void;
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
  peers: [],
  setPeers: (peers: Array<ClientData>) =>
    set((state) => {
      return { ...state, peers: peers };
    }),
  locations: [],
  setLocations: (locations: Array<LocationData>) =>
    set((state) => {
      return { ...state, locations: locations };
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
  crossedPeers: Set<number>;
  setCrossedPeers: (peers: Set<number>) => void;
  togglePeer: (peer: number) => void;
}
export const useCrossedStore = create<CrossedState>((set) => ({
  crossedLocations: new Set<number>(),
  setCrossedLocations: (locations: Set<number>) =>
    set((state) => {
      return { ...state, crossedLocations: locations };
    }),
  crossedPeers: new Set<number>(),
  setCrossedPeers: (peers: Set<number>) =>
    set((state) => {
      return { ...state, crossedPeers: peers };
    }),
  togglePeer: (peer: number) =>
    set((state) => {
      const isCrossed = state.crossedPeers.has(peer);
      const newPeers = new Set(state.crossedPeers);
      if (isCrossed) {
        newPeers.delete(peer);
      } else {
        newPeers.add(peer);
      }
      return { ...state, crossedPeers: newPeers };
    }),
}));

interface ToastState {
  message: string;
  show: boolean;
  timerId: number | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}
export const useToastStore = create<ToastState>((set, get) => ({
  message: "",
  show: false,
  timerId: null,
  showToast: (message: string) => {
    const { timerId } = get();
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      set({ show: false, timerId: null });
    }, 3000);
    set({ message, show: true, timerId: newTimerId });
  },
  hideToast: () => {
    const { timerId } = get();
    if (timerId) {
      clearTimeout(timerId);
    }
    set({ show: false, timerId: null });
  },
}));
