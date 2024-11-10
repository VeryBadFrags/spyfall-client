import { memo } from "react";
import Card from "../Card";
import { LocationData } from "../types/locationData.type";

interface LocationsProps {
  locations: Array<LocationData>;
  currentLocation: string;
  crossedLocations: Set<number>;
  setCrossedLocations: (crossedLocations: Set<number>) => void;
  // crossLocation: (index: number) => void;
}

const Locations = memo(function Locations(props: LocationsProps) {
  function crossLocation(indexToCross: number) {
    if (props.crossedLocations.has(indexToCross)) {
      const clonedSet = new Set(props.crossedLocations);
      clonedSet.delete(indexToCross);
      props.setCrossedLocations(clonedSet);
    } else {
      const clonedSet = new Set(props.crossedLocations);
      clonedSet.add(indexToCross);
      props.setCrossedLocations(clonedSet);
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
                key={`loc-${i}-${props.crossedLocations.has(i)}`}
                className={
                  "list-group-item list-group-item-action text-dark py-1 " +
                  (props.currentLocation === currentLocation.name
                    ? " bg-info"
                    : "") +
                  (props.crossedLocations.has(i) ? " strike" : "")
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
