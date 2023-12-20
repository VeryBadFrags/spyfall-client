import React from "react";
import Card from "../Card";

interface LocationsProps {
  locations: Array<string>;
  currentLocation: string;
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
                  (props.currentLocation === loc ? "bg-info" : null)
                }
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  target.classList.contains("strike")
                    ? target.classList.remove("strike")
                    : target.classList.add("strike");
                }}
              >
                {loc}
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
