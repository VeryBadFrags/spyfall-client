import React from "react";
import Card from "../Card";
import LobbyCode from "./LobbyCode";
import NewGameForm from "./NewGameForm";
import PlayersList from "./PlayersList";

function Settings(props) {
  if (props.gameMode) {
    return (
      <Card
        className="border-secondary"
        header='<i class="fas fa-cog"></i> Settings'
      >
        <LobbyCode lobbyStatus={props.lobbyStatus} />
        <PlayersList lobbyStatus={props.lobbyStatus} />
        <NewGameForm
          readyCheck={props.readyCheck}
          setReadyCheck={props.setReadyCheck}
          connectionManager={props.connectionManager}
        />
        <hr />
        <DisconnectButton disconnectCallback={props.disconnectCallback} />
      </Card>
    );
  } else {
    return null;
  }
}

function DisconnectButton({ disconnectCallback }) {
  return (
    <div className="d-grid">
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => disconnectCallback()}
      >
        <i className="fas fa-sign-out-alt"></i> Leave lobby
      </button>
    </div>
  );
}

export default Settings;
