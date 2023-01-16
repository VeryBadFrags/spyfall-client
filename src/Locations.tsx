import React from "react";
import Card from "./Card";

interface LocationsProps {
  locations: Array<string>;
}

export default function Locations({ locations }: LocationsProps) {
  if (locations && locations.length > 0) {
    return (
      <Card header="📍 Locations" hasBody={false}>
        <ul className="list-group list-group-flush">
          {locations.map((loc, i) => {
            return (
              <li
                key={i}
                className="list-group-item list-group-item-action text-dark py-1"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  target.classList.contains("strike")
                    ? target.classList.remove("strike")
                    : target.classList.add("strike");
                }}
              >
                {loc}
              </li>
            );
          })}
        </ul>
      </Card>
    );
  } else {
    return null;
  }
}
