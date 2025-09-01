import Card from "../components/Card";
import { LocationData } from "../types/locationData.type";
import { useCrossedStore, useLobbyStore } from "../utils/store";

const Locations = function Locations(props: {
  locations: Array<LocationData>;
}) {
  const crossedLocations = useCrossedStore((state) => state.crossedLocations);
  const setCrossedLocations = useCrossedStore((state) => state.setCrossedLocations);
  const currentLocation = useLobbyStore((state) => state.currentLocation);

  function crossLocation(indexToCross: number) {
    const clonedSet = new Set(crossedLocations);
    if (crossedLocations.has(indexToCross)) {
      clonedSet.delete(indexToCross);
    } else {
      clonedSet.add(indexToCross);
    }
    setCrossedLocations(clonedSet);
  }

  if (props.locations && props.locations.length > 0) {
    return (
      <Card header="📍 Locations" hasBody={false}>
        <div className="list-group list-group-flush">
          {props.locations.map((loc, i) => {
            return (
              <button
                type="button"
                key={`loc-${i}-${crossedLocations.has(i)}`}
                className={
                  "list-group-item list-group-item-action text-dark py-1 " +
                  (currentLocation === loc.name
                    ? " bg-info"
                    : "") +
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
};

export default Locations;
