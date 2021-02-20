export default function Locations({ locations }) {
  if (locations && locations.length > 0) {
    return (
      <div className="col">
        <div className="card shadow">
          <div className="card-header">📍 Locations</div>
          <ul className="list-group list-group-flush">
            {locations.map((loc, i) => {
              return (
                <li key={i} className="clickable list-group-item py-1">
                  {loc}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
