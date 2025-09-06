import Card from "@components/Card";
import { useCrossedStore, useLobbyStore } from "@store/store";
import { FaUser } from "react-icons/fa";

export default function PlayersList() {
  const peers = useLobbyStore((state) => state.peers);
  const crossedPeers = useCrossedStore((state) => state.crossedPeers);
  const togglePeer = useCrossedStore((state) => state.togglePeer);
  return (
    <Card header="Players" hasBody={false} icon={<FaUser />}>
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
}
