import React from "react";
import { LobbyStatusType } from "../Types";

interface PlayersListProps {
  lobbyStatus: LobbyStatusType;
}

export default function PlayersList({ lobbyStatus }: PlayersListProps) {
  return (
    <div>
      <h6 className="card-title">
        <i className="fas fa-users" /> Players
      </h6>
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
    </div>
  );
}
