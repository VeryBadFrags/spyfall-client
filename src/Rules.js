import { useState } from "react";

function Rules(props) {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="col">
      <div className="card shadow">
        <div className="card-header">
          <i className="fas fa-book"></i> Rules
        </div>
        <div className="card-body">
          <div className="d-grid">
            <button
              className="btn btn-outline-primary"
              onClick={(event) => setShowRules(!showRules)}
            >
              <i className="fas fa-eye"></i> Show/Hide
            </button>
            <RulesDetails showRules={showRules} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RulesDetails(props) {
  if (props.showRules) {
    return (
      <div style={{ display: "block" }}>
        <ul>
          <li>👥 3-10 Players</li>
          <li>⏱ 5 Minutes Rounds</li>
          <li>📱 1 Device per player</li>
        </ul>
        <ul>
          <li>All players are in the same location</li>
          <li>The spy has to guess the current location</li>
          <li>The other players have to guess who the spy is</li>
          <li>
            The first player picks another person and asks them a question about
            the location (Do people wear a uniform? Is there a specific color in
            this place? ...)
          </li>
          <li>
            The player who just answered the question asks the next question to
            another person
          </li>
        </ul>
        <h6>When the timer ends</h6>
        <ul>
          <li>
            Players vote to designate the spy
            <ul>
              <li>
                If the players have voted for the spy, the spy has one chance to
                guess the location and win the game
              </li>
              <li>If the players have voted for an innocent, the spy wins</li>
            </ul>
          </li>
        </ul>
        <h6>At any time</h6>
        <ul>
          <li>The players can vote for a spy if they have a majority</li>
          <li>
            The spy can guess the location. The spy wins the game if he guessed
            correctly, or loses otherwise
          </li>
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default Rules;
