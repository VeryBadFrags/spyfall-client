import { memo } from "react";
import Card from "../Card";
import { LobbyStatusPayload } from "../types/lobbyStatus.type";

const PlayersList = memo(function PlayersList(props: {
  lobbyStatus: LobbyStatusPayload;
  crossPeer: (index: number) => void;
}) {
  return (
    <Card header="👤 Players" hasBody={false}>
      <div className="list-group list-group-flush">
        {props.lobbyStatus?.peers?.map((client, index) => {
          return (
            <button
              type="button"
              className={
                "list-group-item list-group-item-action" +
                (client.crossed ? " strike" : "")
              }
              key={client.name}
              onClick={() => props.crossPeer(index)}
            >
              {client.name} {client.ready ? " ✅" : null}
            </button>
          );
        })}
      </div>
    </Card>
  );
});

export default PlayersList;
