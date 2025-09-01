import Card from "../components/Card";
import { useCrossedStore, useLobbyStore } from "../utils/store";

const PlayersList = function PlayersList() {
  const peers = useLobbyStore((state) => state.peers);
  const crossedPeers = useCrossedStore((state) => state.crossedPeers);
  const togglePeer = useCrossedStore((state) => state.togglePeer);
  return (
    <Card header="👤 Players" hasBody={false}>
      <div className="list-group list-group-flush">
        {peers.map((peer, index) => {
          return (
            <button
              type="button"
              className={
                "list-group-item list-group-item-action" +
                (crossedPeers.has(index) ? " strike" : "")
              }
              key={peer.name}
              onClick={() => togglePeer(index)}
            >
              {peer.name} {peer.ready ? " ✅" : null}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default PlayersList;
