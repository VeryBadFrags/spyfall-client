import React from "react";
import Card from "../Card";
import { LocationData } from "../types/locationData.type";

interface LocationsProps {
  locations: Array<LocationData>;
  currentLocation: string;
  crossLocation: (index: number) => void;
}

export default function Locations(props: LocationsProps) {
  if (props.locations && props.locations.length > 0) {
    return (
      <Card header="📍 Locations" hasBody={false}>
        <div className="list-group list-group-flush">
          {props.locations.map((loc, i) => {
            return (
              <button
                type="button"
                key={i}
                className={
                  "list-group-item list-group-item-action text-dark py-1 " +
                  (props.currentLocation === loc.name ? " bg-info" : '') +
                  (loc.crossed ? " strike" : '')
                }
                onClick={() => props.crossLocation(i)}
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
