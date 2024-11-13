// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faStopwatch, faBell } from "@fortawesome/free-solid-svg-icons";
library.add(faStopwatch, faBell);
const stopwatchIcon = icon({ prefix: "fas", iconName: faStopwatch.iconName });
const bellIcon = icon({ prefix: "fas", iconName: faBell.iconName });

function getMinutes(timer: number): string {
  const minutes = Math.floor(timer / 60);
  return minutes < 10 ? "0" + minutes : minutes.toString();
}

function getSeconds(timer: number): string {
  const seconds = timer % 60;
  return seconds < 10 ? "0" + seconds : seconds.toString();
}

const TimeDisplay = function TimeDisplay(props: { timer: number }) {
  if (props.timer > 0) {
    return (
      <div>
        <>
          {Parser(stopwatchIcon.html.toString())} {getMinutes(props.timer)}:
          {getSeconds(props.timer)}
        </>
      </div>
    );
  } else {
    return (
      <span>
        {Parser(bellIcon.html.toString())} Time&apos;s up! Who is the Spy?
      </span>
    );
  }
};

export default TimeDisplay;
