import { memo, useState } from "react";
import Card from "../Card";
import { LocationData } from "../types/locationData.type";

const Locations = memo(function Locations(props: {
  locations: Array<LocationData>;
  currentLocation: string;
}) {
  const [crossedLocations, setCrossedLocations] = useState(new Set<number>());

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
          {props.locations.map((currentLocation, i) => {
            return (
              <button
                type="button"
                key={`loc-${i}-${crossedLocations.has(i)}`}
                className={
                  "list-group-item list-group-item-action text-dark py-1 " +
                  (props.currentLocation === currentLocation.name
                    ? " bg-info"
                    : "") +
                  (crossedLocations.has(i) ? " strike" : "")
                }
                onClick={() => crossLocation(i)}
              >
                {currentLocation.name}
              </button>
            );
          })}
        </div>
      </Card>
    );
  } else {
    return null;
  }
});

export default Locations;
