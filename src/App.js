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

const connectionManager = new ConnectionManager(processMessage);

function processMessage(type, data) {
  if (type === "chat-event") {
    // appendText(data.message, data.author, data.color);
  } else if (type === "session-broadcast") {
    // displayPeers(data.peers.clients);
  } else if (type === "start-game") {
    // startGame(data);
  } else if (type === "session-created") {
    // TODO replace window.location.hash with ?code=
    // window.location.hash = data.sessionId;
    // lobbyDisplay.value = data.sessionId;
    // lobbyDisplay.style.width = `${lobbyDisplay.value.length + 2}rem`;
  }
}

function App() {
  const [gameMode, setGameMode] = useState(false);

  function onConnect() {
    setGameMode(true);
    // resetErrors();
    // showElement("connect-wrapper", false);
    // lobbyElements.forEach((elem) => showElement(elem, true));
    // lobbyDisplay.value = connectionManager.sessionId;
    // lobbyDisplay.style.width = `${lobbyDisplay.value.length}rem`;
  }

  function onDisconnect() {
    //   resetAll();
    // printError(`Connection to server closed`);
    setGameMode(false);
  }

  function appendText(text, author, color) {
    // let newLine = document.createElement("li");
    // if (author) {
    //   let authorElem = document.createElement("b");
    //   authorElem.innerText = `${author}: `;
    //   newLine.appendChild(authorElem);
    // }
    // let textElem = document.createElement("span");
    // textElem.innerText = text;
    // newLine.appendChild(textElem);
    // if (color) {
    //   newLine.style.color = color;
    // }
    // eventsBox.appendChild(newLine);
    // if (eventsBox.childNodes.length > 11) {
    //   eventsBox.removeChild(eventsBox.childNodes[0]);
    // }
  }

  function startGame(data) {
    //   window.scrollTo(0, 0);
    //   clearChat();
    //   readyCheck.checked = false;
    //   resetClickableElements();
    //   startTimer(5 * 60, progressBar);
    //   appendText("Game started");
    //   if (data.spy) {
    //     appendText(
    //       `🕵️ You are the spy, try to guess the current location`,
    //       null,
    //       "red"
    //     );
    //   } else {
    //     appendText(
    //       `😇 You are not the spy, the location is ${data.location}`,
    //       null,
    //       "blue"
    //     );
    //   }
    //   appendText(`First player: ${data.first}`);
  }

  const lobbyElements = ["chat-wrapper", "players-wrapper"];
  function resetAll() {
    // resetErrors();
    // clearChat();
    // showElement("connect-wrapper", true);
    // lobbyElements.forEach((elem) => showElement(elem, false));
    // readyCheck.checked = false;
    // resetClickableElements();
    // clearInterval(intervalId);
    // window.scrollTo(0, 0);
  }

  return (
    <div className="App">
      <Menu />

      <div className="container mb-5 pt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
          <Connect
            gameMode={gameMode}
            connectionManager={connectionManager}
            onConnect={onConnect}
            onDisconnect={onDisconnect}
          />
          <Chat gameMode={gameMode} />
          <Settings
            gameMode={gameMode}
            disconnectCallback={() => connectionManager.disconnect()}
          />
          <Locations />
          <Rules />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
