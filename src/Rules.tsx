import { useState } from "react";
import Card from "./Card";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faUsers,
  faStopwatch,
  faMobileAlt,
  faHourglassEnd,
  faHandPointRight,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEye,
  faHandPointRight,
  faHourglassEnd,
  faMobileAlt,
  faStopwatch,
  faUserSecret,
  faUsers,
);
const eyeIcon = icon({ prefix: "fas", iconName: faEye.iconName });
const handRightIcon = icon({
  prefix: "fas",
  iconName: faHandPointRight.iconName,
});
const hourglassIcon = icon({
  prefix: "fas",
  iconName: faHourglassEnd.iconName,
});
const mobileIcon = icon({ prefix: "fas", iconName: faMobileAlt.iconName });
const spyIcon = icon({ prefix: "fas", iconName: faUserSecret.iconName });
const stopwatchIcon = icon({ prefix: "fas", iconName: faStopwatch.iconName });
const usersIcon = icon({ prefix: "fas", iconName: faUsers.iconName });

export default function Rules() {
  const [showRules, setShowRules] = useState(false);

  return (
    <Card header="📚 Rules">
      <div className="d-grid">
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowRules(!showRules)}
        >
          {Parser(eyeIcon.html.toString())} Show/Hide
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
          <li>{Parser(usersIcon.html.toString())} 3-10 Players</li>
          <li>{Parser(stopwatchIcon.html.toString())} 5 Minutes Rounds</li>
          <li>{Parser(mobileIcon.html.toString())} 1 Device per player</li>
          <li>
            {Parser(spyIcon.html.toString())} There is a 1/1000 chance that
            every player is a spy!
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
        <h6>{Parser(hourglassIcon.html.toString())} When the timer ends</h6>
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
        <h6>{Parser(handRightIcon.html.toString())} At any time</h6>
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
