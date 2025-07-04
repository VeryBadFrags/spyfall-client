import { useState, useEffect, useCallback } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import ConnectionManager from "./utils/connectionManager";
import Locations from "./Locations/Locations";
import Error from "./Error";
import ConnectStatus from "./ConnectStatus";
import PlayersList from "./PlayersList/PlayersList";
import { ServerEvent } from "./types/serverEvent";
import type { LobbyStatusPayload } from "./types/lobbyStatus.type";
import type { ChatPayload } from "./types/chatPayload.type";
import type { GamePayload } from "./types/gamePayload.type";
import type { LocationData } from "./types/locationData.type";
import type { AnyPayload } from "./types/anyPayload.type";
import { TimePayload } from "./types/timePayload.type";
import { ClientEvent } from "./types/clientEvent";
import { setCurrentLobby } from "./utils/lobbyHelper";

const connectionManager = new ConnectionManager();
const chatSize = 8;

function App() {
  const [connectedToServer, setConnectedToServer] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([] as Array<ChatPayload>);
  const [readyCheck, setReadyCheck] = useState(false);
  const [identity, setIdentity] = useState("");
  const [lobbyStatus, setLobbyStatus] = useState({} as LobbyStatusPayload);
  const [locations, setLocations] = useState([] as Array<LocationData>);
  const [currentLocation, setCurrentLocation] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [crossedLocations, setCrossedLocations] = useState(new Set<number>());
  const [serverTime, setServerTime] = useState({
    durationSec: 0,
    timeLeftSec: 0,
  } as TimePayload);

  useEffect(() => {
    connectionManager.initSocket(setConnectedToServer);
  }, []);

  const crossPeerCallback = useCallback(
    (index: number) =>
      setLobbyStatus({
        sessionId: lobbyStatus.sessionId,
        peers: lobbyStatus.peers?.map((peer, i) => {
          if (i === index) {
            peer.crossed = !peer.crossed;
          }
          return peer;
        }),
      }),
    [lobbyStatus],
  );

  const disconnectCallback = useCallback(() => {
    resetAll();
    connectionManager.disconnect();
  }, []);

  const onDisconnectCallback = useCallback(() => {
    resetAll();
    setError("Disconnected from Lobby");
  }, []);

  const appendText = useCallback((newRow: ChatPayload) => {
    setChatContent((previousContent) => {
      if (previousContent.length >= chatSize) {
        // Trim the chat if it's too long
        return [
          ...previousContent.splice(
            previousContent.length - chatSize + 1,
            previousContent.length,
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
      setReadyCheck(false);
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
    [appendText],
  );

  const onMessageCallback = useCallback(
    (type: string, data: AnyPayload) => {
      switch (type) {
        case ServerEvent.ChatEvent:
          appendText(data as ChatPayload);
          break;
        case ServerEvent.SessionBroadcast: // TODO using a wrapper will simplify type casting
          setLobbyStatus(data as LobbyStatusPayload);
          break;
        case ServerEvent.StartGame:
          startGame(data as GamePayload);
          break;
        case ServerEvent.SessionCreated:
          setGameMode(true);
          setError("");
          setIdentity((data as LobbyStatusPayload).identity || "");
          setCurrentLobby((data as LobbyStatusPayload).sessionId);
          break;
        case ServerEvent.Time:
          setServerTime(data as TimePayload);
          break;
      }
    },
    [appendText, startGame],
  );

  const sendChatCallBack = useCallback(
    (eventType: ClientEvent, message: string) => {
      connectionManager.send(eventType, { message: message });
    },
    [],
  );

  function resetAll() {
    setError("");
    setChatContent([]);
    setGameMode(false);
    setReadyCheck(false);
    setLobbyStatus({ sessionId: "" });
    setCrossedLocations(new Set<number>());
    setGameStarted(false);
    window.scrollTo(0, 0);
  }

  return (
    <main className="container-fluid h-100 pt-3">
      <ConnectStatus connected={connectedToServer} />

      <Error error={error} />

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gx-xl-5 gy-4">
        {gameMode ? (
          <>
            <Chat
              sendChatCallBack={sendChatCallBack}
              chatContent={chatContent}
              gameStarted={gameStarted}
              serverTime={serverTime}
              identity={identity}
            />
            <Locations
              locations={locations}
              currentLocation={currentLocation}
              crossedLocations={crossedLocations}
              setCrossedLocations={setCrossedLocations}
            />
            <PlayersList
              lobbyStatus={lobbyStatus}
              crossPeer={crossPeerCallback}
            />
            <GameSettings
              connectionManager={connectionManager}
              disconnectCallback={disconnectCallback}
              readyCheck={readyCheck}
              setReadyCheck={setReadyCheck}
              lobbyStatus={lobbyStatus}
            />
          </>
        ) : (
          <Connect
            setGameMode={setGameMode}
            connectionManager={connectionManager}
            onDisconnect={onDisconnectCallback}
            onMessageCallback={onMessageCallback}
            setConnectedToServer={setConnectedToServer}
          />
        )}
        <Rules />
      </div>
    </main>
  );
}

export default App;
