import "./App.css";
import React, { useState } from "react";
import Connect from "./Connect";
import Chat from "./Chat/Chat";
import Rules from "./Rules";
import GameSettings from "./GameSettings/GameSettings";
import Footer from "./Footer";
import ConnectionManager from "./connection-manager.js";
import Locations from "./Locations";
import Menu from "./Menu/Menu";
import Error from "./Error";

const connectionManager = new ConnectionManager();
const gameDuration = 300;

function App() {
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [readyCheck, setReadyCheck] = useState(false);
  const [lobbyStatus, setLobbyStatus] = useState();
  const [locations, setLocations] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(gameDuration);

  function disconnect() {
    resetAll();
    connectionManager.disconnect();
  }

  const onDisconnect = () => {
    resetAll();
    setError("Connection to server closed");
  };

  function onMessageCallback(type, data) {
    if (type === "chat-event") {
      appendText(data.message, data.author, data.color);
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
  function appendText(text, author, color) {
    let newRow = { text: text, author: author, color: color };
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

  function startGame(data) {
    window.scrollTo(0, 0);
    setChatContent([]);
    setReadyCheck(false);
    setLocations(data.locations);
    resetClickableElements();
    setIsTimerActive(true);
    appendText("Game started");
    if (data.spy) {
      appendText(
        `🕵️ You are the spy, try to guess the current location`,
        null,
        "red"
      );
    } else {
      appendText(
        `😇 You are not the spy, the location is ${data.location}`,
        null,
        "blue"
      );
    }

    appendText(`First player: ${data.first}`);
  }

  function resetAll() {
    setError("");
    setGameMode(false);
    setReadyCheck(false);
    setLobbyStatus();
    resetClickableElements();
    setIsTimerActive(false);
    window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <Menu />

      <div className="container mb-5 pt-3">
        <Error error={error} />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
          {gameMode ? (
            <>
              <Chat
                connectionManager={connectionManager}
                chatContent={chatContent}
                isActive={isTimerActive}
                timer={timer}
                setTimer={setTimer}
                gameDuration={gameDuration}
              />
              <Locations locations={locations} />
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
            />
          )}
          <Rules />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
