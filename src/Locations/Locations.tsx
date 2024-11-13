import { memo, useState } from "react";
import Card from "../Card";
import { LocationData } from "../types/locationData.type";

interface LocationsProps {
  locations: Array<LocationData>;
  currentLocation: string;
}

const Locations = memo(function Locations(props: LocationsProps) {
  const [crossedLocations, setCrossedLocations] = useState(new Set<number>());

  function crossLocation(indexToCross: number) {
    if (crossedLocations.has(indexToCross)) {
      const clonedSet = new Set(crossedLocations);
      clonedSet.delete(indexToCross);
      setCrossedLocations(clonedSet);
    } else {
      const clonedSet = new Set(crossedLocations);
      clonedSet.add(indexToCross);
      setCrossedLocations(clonedSet);
    }
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
