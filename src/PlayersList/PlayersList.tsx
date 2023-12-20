import React from "react";
import Card from "../Card";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";

interface PlayersListProps {
  lobbyStatus: LobbyStatusPayload;
}

export default function PlayersList(props: PlayersListProps) {
  return (
    <Card header="👤 Players" hasBody={false}>
      <div className="list-group list-group-flush">
        {props.lobbyStatus?.peers?.map((client) => {
          return (
            <button
              type="button"
              className={
                "list-group-item list-group-item-action " +
                (client.crossed ? "strike" : null)
              }
              key={client.name}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                target.classList.contains("strike")
                  ? target.classList.remove("strike")
                  : target.classList.add("strike");
              }}
            >
              {client.name} {client.ready ? " ✅" : ""}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
