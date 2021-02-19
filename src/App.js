// import logo from "./logo.svg";
import "./App.css";
import Connect from "./Connect";
import Chat from "./Chat";
import { useState } from "react";
import Rules from "./Rules";
import Settings from "./Settings";
import Footer from "./Footer";

function App() {
  const [gameMode, setGameMode] = useState(false);

  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">🕵️ Spyfall</span>
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <a href="https://games.verybadfrags.com" target="_blank" rel="noopener noreferrer">
              🎮 More games
            </a>
          </div>
        </div>
      </nav>

      <div className="container mb-5 pt-3">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-4">
          <Connect setGameMode={setGameMode} />
          <Chat gameMode={gameMode} />
          <Settings />
          <Rules />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
