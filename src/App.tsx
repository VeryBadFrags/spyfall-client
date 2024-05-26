import { useState, useEffect } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import Footer from "./Footer/Footer";
import ConnectionManager from "./utils/connectionManager";
import Locations from "./Locations/Locations";
import Header from "./Header/Header";
import Error from "./Error";
import ConnectStatus from "./ConnectStatus";
import PlayersList from "./PlayersList/PlayersList";
import { EventTypes } from "./types/eventTypes";
import type { LobbyStatusPayload } from "./types/lobbyStatus.type";
import type { ChatPayload } from "./types/chatPayload.type";
import type { GamePayload } from "./types/socketPayload.type";
import type { LocationData } from "./types/locationData.type";
import type { AnyPayload } from "./types/anyPayload.type";

const connectionManager = new ConnectionManager();

function App() {
  const [connectedToServer, setConnectedToServer] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([] as Array<ChatPayload>);
  const [readyCheck, setReadyCheck] = useState(false);
  const [lobbyStatus, setLobbyStatus] = useState({} as LobbyStatusPayload);
  const [locations, setLocations] = useState([] as Array<LocationData>);
  const [currentLocation, setCurrentLocation] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    connectionManager.initSocket(setConnectedToServer);
  }, []);

  function disconnect() {
    resetAll();
    connectionManager.disconnect();
  }

  const onDisconnect = () => {
    resetAll();
    setError("Disconnected from Lobby");
  };

  function onMessageCallback(type: string, data: AnyPayload) {
    switch (type) {
      case EventTypes.ChatEvent:
        appendText(data as ChatPayload);
        break;
      case EventTypes.SessionBroadcast:
        setLobbyStatus(data as LobbyStatusPayload);
        break;
      case EventTypes.StartGame:
        startGame(data as GamePayload);
        break;
      case EventTypes.SessionCreated:
        setGameMode(true);
        setError("");
        // TODO replace window.location.hash with ?code=
        window.location.hash = (data as LobbyStatusPayload).sessionId;
        break;
    }
  }

  function sendChatCallBack(eventType: string, message: string): void {
    connectionManager.send(eventType, { message: message });
  }

  function resetClickableElements() {
    document
      .querySelectorAll(".strike")
      .forEach((elem) => elem.classList.remove("strike"));
  }

  const chatSize = 8;
  function appendText(newRow: ChatPayload) {
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
  }

  function startGame(data: GamePayload) {
    window.scrollTo(0, 0);
    setChatContent([]);
    setReadyCheck(false);
    setLocations(data.locations.map((loc) => ({ name: loc })));
    setCurrentLocation(data.location);
    resetClickableElements();
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
  }

  function resetAll() {
    setError("");
    setChatContent([]);
    setGameMode(false);
    setReadyCheck(false);
    setLobbyStatus({ sessionId: "" });
    setGameStarted(false);
    resetClickableElements();
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header />

      <Main />

      <Footer />
    </>
  );

  function Main() {
    return (
      <main className="container h-100 pt-3">
        <ConnectStatus connected={connectedToServer} />

        <Error error={error} />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4">
          {gameMode ? (
            <>
              <Chat
                sendChatCallBack={sendChatCallBack}
                chatContent={chatContent}
                gameStarted={gameStarted}
              />
              <Locations
                locations={locations}
                currentLocation={currentLocation}
                crossLocation={(index: number) => {
                  setLocations(
                    locations.map((loc, i) => {
                      if (i === index) {
                        loc.crossed = !loc.crossed;
                      }
                      return loc;
                    }),
                  );
                }}
              />
              <PlayersList
                lobbyStatus={lobbyStatus}
                crossPeer={(index: number) =>
                  setLobbyStatus({
                    sessionId: lobbyStatus.sessionId,
                    peers: lobbyStatus.peers?.map((peer, i) => {
                      if (i === index) {
                        peer.crossed = !peer.crossed;
                      }
                      return peer;
                    }),
                  })
                }
              />
              <GameSettings
                connectionManager={connectionManager}
                disconnectCallback={disconnect}
                readyCheck={readyCheck}
                setReadyCheck={setReadyCheck}
                lobbyStatus={lobbyStatus}
              />
            </>
          ) : (
            <Connect
              setGameMode={setGameMode}
              connectionManager={connectionManager}
              onDisconnect={onDisconnect}
              onMessageCallback={onMessageCallback}
              setConnectedToServer={setConnectedToServer}
            />
          )}
          <Rules />
        </div>
      </main>
    );
  }
}

export default App;
