import React from "react";
import { LobbyStatusType } from "../Types";

interface LobbyStatusWrapper {
  lobbyStatus: LobbyStatusType;
}

export default function PlayersList({ lobbyStatus }: LobbyStatusWrapper) {
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
                let target = e.target as HTMLElement;
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
