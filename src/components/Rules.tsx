import { useState } from "react";
import Card from "@components/Card";
import {
  FaBook,
  FaEye,
  FaHandPointRight,
  FaHourglassEnd,
  FaMobileAlt,
  FaStopwatch,
  FaUsers,
  FaUserSecret,
} from "react-icons/fa";

export default function Rules() {
  // Show rules by default for first-time visitors
  const isFirstVisit = !localStorage.getItem("hasVisited");
  const [showRules, setShowRules] = useState(isFirstVisit);

  // Mark as visited after component mounts
  if (isFirstVisit) {
    localStorage.setItem("hasVisited", "true");
  }

  return (
    <Card header="Rules" icon={<FaBook />}>
      <div className="d-grid">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowRules(!showRules)}
        >
          <FaEye /> Show/Hide
        </button>
        <RulesDetails showRules={showRules} />
      </div>
    </Card>
  );
}

interface RulesDetailsProps {
  showRules: boolean;
}

function RulesDetails(props: RulesDetailsProps) {
  if (props.showRules) {
    return (
      <div>
        <ul className="mt-3">
          <li>
            <FaUsers /> 3-10 Players
          </li>
          <li>
            <FaStopwatch /> 5 Minutes Rounds
          </li>
          <li>
            <FaMobileAlt /> 1 Device per player
          </li>
          <li>
            <FaUserSecret /> There is a 1/1000 chance that every player is a
            spy!
          </li>
        </ul>
        <hr />
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
        <h6>
          <FaHourglassEnd /> When the timer ends
        </h6>
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
        <h6>
          <FaHandPointRight /> At any time
        </h6>
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
