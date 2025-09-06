import Card from "@components/Card";
import { useCrossedStore, useLobbyStore } from "@store/store";
import { FaMapPin } from "react-icons/fa";

export default function Locations() {
  const locations = useLobbyStore((state) => state.locations);
  const currentLocation = useLobbyStore((state) => state.currentLocation);
  const crossedLocations = useCrossedStore((state) => state.crossedLocations);
  const setCrossedLocations = useCrossedStore(
    (state) => state.setCrossedLocations,
  );

  function crossLocation(indexToCross: number) {
    const clonedSet = new Set(crossedLocations);
    if (crossedLocations.has(indexToCross)) {
      clonedSet.delete(indexToCross);
    } else {
      clonedSet.add(indexToCross);
    }
    setCrossedLocations(clonedSet);
  }

  if (locations && locations.length > 0) {
    return (
      <Card header="Locations" hasBody={false} icon={<FaMapPin />}>
        <div className="list-group list-group-flush">
          {locations.map((loc, i) => {
            return (
              <button
                type="button"
                key={`loc-${i}-${crossedLocations.has(i)}`}
                className={
                  "list-group-item list-group-item-action text-dark py-1 " +
                  (currentLocation === loc.name ? " bg-info" : "") +
                  (crossedLocations.has(i) ? " strike" : "")
                }
                onClick={() => crossLocation(i)}
              >
                {loc.name}
              </button>
            );
          })}
        </div>
      </Card>
    );
  } else {
    return null;
  }
}
