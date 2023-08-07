import React from "react";
import Card from "../Card";
import { LobbyStatusType } from "../types/lobby_status.type";

interface PlayersListProps {
  lobbyStatus: LobbyStatusType;
}

export default function PlayersList({ lobbyStatus }: PlayersListProps) {
  return (
    <Card header="👤 Players" hasBody={false}>
      <ul className="list-group list-group-flush">
        {lobbyStatus?.peers?.map((client) => {
          return (
            <li
              className="list-group-item clickable"
              key={client.name}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                target.classList.contains("strike")
                  ? target.classList.remove("strike")
                  : target.classList.add("strike");
              }}
            >
              {client.name} {client.ready ? " ✅" : ""}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
