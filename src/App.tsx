import { useCallback, useEffect, useRef } from "react";
import ConnectBox from "@components/ConnectBox";
import Chat, { useChatStore } from "@components/modules/Chat/Chat";
import Rules from "@components/Rules";
import GameSettings from "@components/modules/GameSettings/GameSettings";
import ConnectionManager from "@utils/connectionManager";
import { setCurrentLobby } from "@utils/lobbyHelper";
import Locations from "@components/Locations";
import ErrorBox, { useErrorMessageStore } from "@components/ErrorBox";
import ConnectionInfo from "@components/ConnectionInfo";
import PlayersList from "@components/PlayersList";
import { useTimerStore } from "@components/modules/Chat/Timer";
import Hero from "@components/Hero";
import { ServerEvent } from "./types/serverEvent";
import type { LobbyStatusPayload } from "./types/lobbyStatus.type";
import type { ChatPayload } from "./types/chatPayload.type";
import type { GamePayload } from "./types/gamePayload.type";
import type { AnyPayload } from "./types/anyPayload.type";
import type { TimePayload } from "./types/timePayload.type";
import type { ClientEvent } from "./types/clientEvent";
import {
  useCrossedStore,
  useLobbyStore,
  useSessionIdStore,
} from "@store/store";

const connectionManager = new ConnectionManager();

export default function App() {
  const connectBoxRef = useRef<HTMLDivElement>(null);
  const setSessionId = useSessionIdStore((state) => state.setSessionId);
  const setIsConnected = useLobbyStore((state) => state.setIsConnected);
  const isInLobby = useLobbyStore((state) => state.isInLobby);
  const setIsInLobby = useLobbyStore((state) => state.setIsInLobby);
  const setGameStarted = useLobbyStore((state) => state.setGameStarted);
  const setIsPlayerReady = useLobbyStore((state) => state.setIsPlayerReady);
  const setPeers = useLobbyStore((state) => state.setPeers);
  const setLocations = useLobbyStore((state) => state.setLocations);
  const setCurrentLocation = useLobbyStore((state) => state.setCurrentLocation);
  const setChatContent = useChatStore((state) => state.setChatContent);
  const appendChat = useChatStore((state) => state.appendChat);
  const setServerTime = useTimerStore((state) => state.setServerTime);
  const setCrossedLocations = useCrossedStore(
    (state) => state.setCrossedLocations,
  );
  const setCrossedPeers = useCrossedStore((state) => state.setCrossedPeers);
  const setErrorMessage = useErrorMessageStore(
    (state) => state.setErrorMessage,
  );

  const handlePlayNowClick = useCallback(() => {
    connectBoxRef.current?.scrollIntoView({ behavior: "smooth" });
    // Focus on the player name input after scrolling and add highlight
    setTimeout(() => {
      const input = document.getElementById("player-name");
      if (input) {
        input.focus();
        input.classList.add("highlight-input");
        // Remove the class after animation completes
        setTimeout(() => input.classList.remove("highlight-input"), 1600);
      }
    }, 500);
  }, []);

  useEffect(() => {
    connectionManager.initSocket(setIsConnected);
  }, []);

  const disconnectCallback = useCallback(() => {
    resetAll();
    connectionManager.disconnect();
  }, []);

  const onDisconnectCallback = useCallback(() => {
    resetAll();
    setErrorMessage("Disconnected from Lobby");
  }, []);

  const startGame = useCallback(
    (data: GamePayload) => {
      // TODO consolidate with resetAll?
      window.scrollTo(0, 0);
      setChatContent([]);
      setIsPlayerReady(false);
      setLocations(data.locations.map((loc) => ({ name: loc })));
      setCurrentLocation(data.location);
      setCrossedLocations(new Set<number>());
      setCrossedPeers(new Set<number>());
      appendChat({ message: "Game started" });
      setGameStarted(true);

      if (data.spy) {
        appendChat({
          message: "🕵️ You are the spy, try to guess the current location",
          color: "red",
        });
      } else {
        appendChat({
          message: `😇 You are not the spy, the location is ${data.location}`,
          color: "blue",
        });
      }

      appendChat({ message: `First player: ${data.first}` });
    },
    [appendChat],
  );

  const onMessageCallback = useCallback(
    (type: string, data: AnyPayload) => {
      switch (type) {
        case ServerEvent.ChatEvent:
          appendChat(data as ChatPayload);
          break;
        case ServerEvent.SessionBroadcast: // TODO using a wrapper will simplify type casting
          setSessionId((data as LobbyStatusPayload).sessionId);
          setPeers((data as LobbyStatusPayload).peers || []);
          break;
        case ServerEvent.StartGame:
          startGame(data as GamePayload);
          break;
        case ServerEvent.SessionCreated:
          setIsInLobby(true);
          setErrorMessage("");
          setSessionId((data as LobbyStatusPayload).sessionId);
          setCurrentLobby((data as LobbyStatusPayload).sessionId);
          break;
        case ServerEvent.Time:
          setServerTime(data as TimePayload);
          break;
      }
    },
    [appendChat, startGame],
  );

  const sendChatCallBack = useCallback(
    (eventType: ClientEvent, message: string) => {
      connectionManager.send(eventType, { message: message });
    },
    [],
  );

  function resetAll() {
    setErrorMessage("");
    setChatContent([]);
    setIsInLobby(false);
    setIsPlayerReady(false);
    setSessionId("");
    setPeers([]); // TODO is it necessary?
    setCrossedLocations(new Set<number>());
    setCrossedPeers(new Set<number>());
    setGameStarted(false);
    window.scrollTo(0, 0);
  }

  return (
    <>
      {!isInLobby && <Hero onPlayNowClick={handlePlayNowClick} />}

      <main className="container-fluid h-100 pt-3">
        <ConnectionInfo />

        <ErrorBox />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xxl-4 gx-xl-5 gy-4">
        {isInLobby ? (
          <>
            <Chat sendChatCallBack={sendChatCallBack} />
            <Locations />
            <PlayersList />
            <GameSettings
              connectionManager={connectionManager}
              disconnectCallback={disconnectCallback}
            />
          </>
        ) : (
          <div ref={connectBoxRef}>
            <ConnectBox
              connectionManager={connectionManager}
              onDisconnect={onDisconnectCallback}
              onMessageCallback={onMessageCallback}
            />
          </div>
        )}
        <Rules />
      </div>
      </main>
    </>
  );
}
