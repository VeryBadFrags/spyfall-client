import "./App.css";
import React, { useState, useEffect } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import Footer from "./Footer/Footer";
import ConnectionManager from "./utils/connection_manager";
import Locations from "./Locations";
import Header from "./Header/Header";
import Error from "./Error";
import ConnectStatus from "./ConnectStatus";
import PlayersList from "./PlayersList/PlayersList";
import { ChatRowType } from "./types/chat_row.type";
import { SocketPayload } from "./interfaces/socket_payload.interface";
import { LobbyStatusType } from "./types/lobby_status.type";
import { EventTypes } from "./types/event_types";

const connectionManager = new ConnectionManager();

function App() {
  const [connectedToServer, setConnectedToServer] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([] as Array<ChatRowType>);
  const [readyCheck, setReadyCheck] = useState(false);
  const [lobbyStatus, setLobbyStatus] = useState({} as LobbyStatusType);
  const [locations, setLocations] = useState([] as Array<string>);
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

  function onMessageCallback(type: string, data: any) {
    // TODO use a switch
    if (type === EventTypes.ChatEvent) {
      appendText({
        text: data.message,
        author: data.author,
        color: data.color,
      });
    } else if (type === EventTypes.SessionBroadcast) {
      setLobbyStatus(data);
    } else if (type === EventTypes.StartGame) {
      startGame(data);
    } else if (type === EventTypes.SessionCreated) {
      setGameMode(true);
      setError("");
      // TODO replace window.location.hash with ?code=
      window.location.hash = data.sessionId;
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

  const chatSize = 11;
  function appendText(newRow: ChatRowType) {
    setChatContent((previousContent) => {
      // Trim the chat if it's too long
      if (previousContent.length >= chatSize) {
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

  function startGame(data: SocketPayload) {
    window.scrollTo(0, 0);
    setChatContent([]);
    setReadyCheck(false);
    setLocations(data.locations);
    setCurrentLocation(data.location);
    resetClickableElements();
    appendText({ text: "Game started" });
    setGameStarted(true);

    if (data.spy) {
      appendText({
        text: "🕵️ You are the spy, try to guess the current location",
        color: "red",
      });
    } else {
      appendText({
        text: `😇 You are not the spy, the location is ${data.location}`,
        color: "blue",
      });
    }

    appendText({ text: `First player: ${data.first}` });
  }

  function resetAll() {
    setError("");
    setChatContent([]);
    setGameMode(false);
    setReadyCheck(false);
    setLobbyStatus({});
    setGameStarted(false);
    resetClickableElements();
    window.scrollTo(0, 0);
  }

  return (
    <div className="app">
      <Header />

      <Main />

      <Footer />
    </div>
  );

  function Main() {
    return (
      <main className="main container mb-5 pt-3">
        <ConnectStatus connected={connectedToServer} />

        <Error error={error} />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
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
              />
              <PlayersList lobbyStatus={lobbyStatus} />
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
