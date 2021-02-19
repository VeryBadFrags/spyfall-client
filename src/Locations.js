function Locations() {
  const locationsList = [
    "✈️💺 Airport",
    "🏦💰 Bank",
    "🎰💵 Casino",
    "🎞🍿 Cinema",
    "🦸🦹 Cosplay Convention",
    "🛳🌊 Cruise Ship",
    "⚽️🏟 Football Stadium",
    "🌳🏕 Forest Camp",
    "🏪🛒 Grocery Store",
    "🏥🧑‍⚕️ Hospital",
    "🏨🛏 Hotel",
    "🌕🧑‍🚀 Moon Colony",
    "🏛🖼 Museum",
    "🏟🎸 Rock Concert",
    "🚄🛤 Train Station",
    "🏫🎓 University",
  ];

  const extendedLocationsList = [
    "🏝🥥 Desert Island",
    "⛰🥾 Mountain Hike",
    "🏤📮 Post Office",
    "🍽👩‍🍳 Restaurant",
  ];

  return (
    <div class="col">
      <div class="card shadow">
        <div class="card-header">📍 Locations</div>
        <ul class="list-group list-group-flush"></ul>
      </div>
    </div>
  );
}

export default Locations;
