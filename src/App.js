// import logo from "./logo.svg";
import "./App.css";
import Connect from "./Connect";
import Chat from "./Chat";
import { useState } from "react";
import Rules from "./Rules";
import Settings from "./Settings";
import Footer from "./Footer";
import ConnectionManager from "./connection-manager.js";
import Locations from "./Locations";
import Menu from "./Menu";
import Error from "./Error";

const connectionManager = new ConnectionManager();

function App() {
  const [gameMode, setGameMode] = useState(false);
  const [error, setError] = useState("");
  const [chatContent, setChatContent] = useState([]);
  const [readyCheck, setReadyCheck] = useState(false);
  const [lobbyStatus, setLobbyStatus] = useState();
  const [locations, setLocations] = useState([]);

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

  const chatSize = 16;
  function appendText(text, author, color) {
    let newRow = { text: text, author: author, color: color };
    setChatContent((previousContent) => {
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
    clearChat();
    setReadyCheck(false);
    setLocations(data.locations);
    //  TODO resetClickableElements();
    //   startTimer(5 * 60, progressBar);
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
    // TODO resetClickableElements();
    // clearInterval(intervalId);
    window.scrollTo(0, 0);
  }

  function clearChat() {
    setChatContent([]);
  }

  return (
    <div className="App">
      <Menu />

      <div className="container mb-5 pt-3">
        <Error error={error} />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
          <Connect
            gameMode={gameMode}
            connectionManager={connectionManager}
            onDisconnect={onDisconnect}
            onMessageCallback={onMessageCallback}
          />
          <Chat
            gameMode={gameMode}
            connectionManager={connectionManager}
            chatContent={chatContent}
          />
          <Locations locations={locations} />
          <Settings
            gameMode={gameMode}
            connectionManager={connectionManager}
            disconnectCallback={() => connectionManager.disconnect()}
            readyCheck={readyCheck}
            setReadyCheck={setReadyCheck}
            lobbyStatus={lobbyStatus}
          />
          <Rules />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
