import { useState, useEffect, useCallback } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import ConnectionManager from "./utils/connectionManager";
import Locations from "./Locations/Locations";
import ErrorBox, { useErrorMessageStore } from "./ErrorBox";
import ConnectStatus from "./ConnectStatus";
import PlayersList from "./PlayersList/PlayersList";
import { ServerEvent } from "./types/serverEvent";
import type { LobbyStatusPayload } from "./types/lobbyStatus.type";
import type { ChatPayload } from "./types/chatPayload.type";
import type { GamePayload } from "./types/gamePayload.type";
import type { AnyPayload } from "./types/anyPayload.type";
import { TimePayload } from "./types/timePayload.type";
import { ClientEvent } from "./types/clientEvent";
import { setCurrentLobby } from "./utils/lobbyHelper";
import { useTimerStore } from "./Chat/Timer";
import {
  useCrossedStore,
  useLobbyStore,
  useSessionIdStore,
} from "./utils/store";

const connectionManager = new ConnectionManager();
const chatSize = 8;

function App() {
  const [chatContent, setChatContent] = useState([] as Array<ChatPayload>);

  const setSessionId = useSessionIdStore((state) => state.setSessionId);
  const setIsConnected = useLobbyStore((state) => state.setIsConnected);
  const isInLobby = useLobbyStore((state) => state.isInLobby);
  const setIsInLobby = useLobbyStore((state) => state.setIsInLobby);
  const setGameStarted = useLobbyStore((state) => state.setGameStarted);
  const setIsPlayerReady = useLobbyStore((state) => state.setIsPlayerReady);
  const peers = useLobbyStore((state) => state.peers);
  const setPeers = useLobbyStore((state) => state.setPeers);
  const setLocations = useLobbyStore((state) => state.setLocations);
  const setCurrentLocation = useLobbyStore((state) => state.setCurrentLocation);
  const setServerTime = useTimerStore((state) => state.setServerTime);
  const setCrossedLocations = useCrossedStore(
    (state) => state.setCrossedLocations
  );
  const setErrorMessage = useErrorMessageStore(
    (state) => state.setErrorMessage
  );

  useEffect(() => {
    connectionManager.initSocket(setIsConnected);
  }, []);

  // TODO replace with store
  const crossPeerCallback = useCallback(
    (index: number) =>
      setPeers(
        peers.map((peer, i) => {
          if (i === index) {
            peer.crossed = !peer.crossed;
          }
          return peer;
        })
      ),
    [peers]
  );

  const disconnectCallback = useCallback(() => {
    resetAll();
    connectionManager.disconnect();
  }, []);

  const onDisconnectCallback = useCallback(() => {
    resetAll();
    setErrorMessage("Disconnected from Lobby");
  }, []);

  const appendText = useCallback((newRow: ChatPayload) => {
    setChatContent((previousContent) => {
      if (previousContent.length >= chatSize) {
        // Trim the chat if it's too long
        return [
          ...previousContent.splice(
            previousContent.length - chatSize + 1,
            previousContent.length
          ),
          newRow,
        ];
      } else {
        return [...previousContent, newRow];
      }
    });
  }, []);

  const startGame = useCallback(
    (data: GamePayload) => {
      // TODO consolidate with resetAll
      window.scrollTo(0, 0);
      setChatContent([]);
      setIsPlayerReady(false);
      setLocations(data.locations.map((loc) => ({ name: loc })));
      setCurrentLocation(data.location);
      setCrossedLocations(new Set<number>());
      appendText({ message: "Game started" });
      setGameStarted(true);

      if (data.spy) {
        appendText({
          message: "🕵️ You are the spy, try to guess the current location",
          color: "red",
        });
      } else {
        appendText({
          message: `😇 You are not the spy, the location is ${data.location}`,
          color: "blue",
        });
      }

      appendText({ message: `First player: ${data.first}` });
    },
    [appendText]
  );

  const onMessageCallback = useCallback(
    (type: string, data: AnyPayload) => {
      switch (type) {
        case ServerEvent.ChatEvent:
          appendText(data as ChatPayload);
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
    [appendText, startGame]
  );

  const sendChatCallBack = useCallback(
    (eventType: ClientEvent, message: string) => {
      connectionManager.send(eventType, { message: message });
    },
    []
  );

  function resetAll() {
    setErrorMessage("");
    setChatContent([]);
    setIsInLobby(false);
    setIsPlayerReady(false);
    setSessionId("");
    setPeers([]); // TODO is it necessary?
    setCrossedLocations(new Set<number>());
    setGameStarted(false);
    window.scrollTo(0, 0);
  }

  return (
    <main className="container-fluid h-100 pt-3">
      <ConnectStatus />

      <ErrorBox />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-xl-5 gy-4">
        {isInLobby ? (
          <>
            <Chat
              sendChatCallBack={sendChatCallBack}
              chatContent={chatContent}
            />
            <Locations />
            <PlayersList crossPeer={crossPeerCallback} />
            <GameSettings
              connectionManager={connectionManager}
              disconnectCallback={disconnectCallback}
            />
          </>
        ) : (
          <Connect
            connectionManager={connectionManager}
            onDisconnect={onDisconnectCallback}
            onMessageCallback={onMessageCallback}
          />
        )}
        <Rules />
      </div>
    </main>
  );
}

export default App;
