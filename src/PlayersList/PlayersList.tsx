import { memo } from "react";
import Card from "../Card";
import { useLobbyStore } from "../utils/store";

const PlayersList = memo(function PlayersList(props: {
  crossPeer: (index: number) => void;
}) {
  const lobbyStatus = useLobbyStore((state) => state.lobbyStatus);
  return (
    <Card header="👤 Players" hasBody={false}>
      <div className="list-group list-group-flush">
        {lobbyStatus.peers?.map((client, index) => {
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
