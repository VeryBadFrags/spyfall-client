import Card from "../Card";
import { useLobbyStore } from "../utils/store";

const PlayersList = function PlayersList(props: {
  crossPeer: (index: number) => void;
}) {
  const peers = useLobbyStore((state) => state.peers);
  return (
    <Card header="👤 Players" hasBody={false}>
      <div className="list-group list-group-flush">
        {peers.map((client, index) => {
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
};

export default PlayersList;
