import "./App.css";
import React, { useState, useEffect } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import Footer from "./Footer";
import ConnectionManager from "./utils/connection-manager";
import Locations from "./Locations";
import Header from "./Header/Header";
import Error from "./Error";
import { ChatRowType, LobbyStatusType, SocketPayload } from "./Types";
import ConnectStatus from "./ConnectStatus";
import PlayersList from "./PlayersList/PlayersList";

const connectionManager = new ConnectionManager();

function App() {
  const [connectedToServer, setConnectedToServer] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([] as Array<ChatRowType>);
  const [readyCheck, setReadyCheck] = useState(false);
  const [lobbyStatus, setLobbyStatus] = useState({} as LobbyStatusType);
  const [locations, setLocations] = useState([] as Array<string>);

  useEffect(() => {
    connectionManager.initSocket(setConnectedToServer);
    console.log("connect");
  }, []);

  function disconnect() {
    resetAll();
    connectionManager.disconnect();
  }

  const onDisconnect = () => {
    resetAll();
    setError("Disconnected from Lobby");
  };

  function onMessageCallback(type: string, data: SocketPayload) {
    if (type === "chat-event") {
      appendText({
        text: data.message,
        author: data.author,
        color: data.color,
      });
    } else if (type === "session-broadcast") {
      setLobbyStatus(data);
    } else if (type === "start-game") {
      startGame(data);
    } else if (type === "session-created") {
      setGameMode(true);
      setError("");
      // TODO replace window.location.hash with ?code=
      window.location.hash = data.sessionId;
    }
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
            previousContent.length
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
    resetClickableElements();
    appendText({ text: "Game started" });
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
    setGameMode(false);
    setReadyCheck(false);
    setLobbyStatus({});
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
    useEffect(() => {
      console.log("paint main");
    }, []);

    return (
      <main className="main container mb-5 pt-3">
        <ConnectStatus connected={connectedToServer} />

        <Error error={error} />

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
          {gameMode ? (
            <>
              <Chat
                connectionManager={connectionManager}
                chatContent={chatContent}
              />
              <Locations locations={locations} />
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
