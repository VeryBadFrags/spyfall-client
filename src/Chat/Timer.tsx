import { memo, useEffect, useState } from "react";
import { gameDuration } from "../Constants";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faStopwatch, faBell } from "@fortawesome/free-solid-svg-icons";
library.add(faStopwatch, faBell);
const stopwatchIcon = icon({ prefix: "fas", iconName: faStopwatch.iconName });
const bellIcon = icon({ prefix: "fas", iconName: faBell.iconName });

const Timer = memo(function Timer() {
  const [timer, setTimer] = useState(gameDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((seconds: number) => seconds - 1);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="progress mb-2">
      <div
        className="progress-bar bg-info text-dark"
        role="progressbar"
        style={{
          width: timer >= 0 ? `${(timer / gameDuration) * 100}%` : "100%",
        }}
        aria-label="Game timer"
      >
        <ProgressBarDisplay timer={timer} />
      </div>
    </div>
  );
});

interface ProgressBarDisplayProps {
  timer: number;
}

function ProgressBarDisplay({ timer }: ProgressBarDisplayProps) {
  if (timer >= 0) {
    return (
      <div>
        <>
          {Parser(stopwatchIcon.html.toString())} {getMinutes(timer)}:
          {getSeconds(timer)}
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
}

function getMinutes(timer: number): string {
  const minutes = Math.floor(timer / 60);
  return minutes < 10 ? "0" + minutes : minutes.toString();
}

function getSeconds(timer: number): string {
  const seconds = timer % 60;
  return seconds < 10 ? "0" + seconds : seconds.toString();
}

export default Timer;
