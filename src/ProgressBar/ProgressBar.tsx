import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar() {
  const gameDuration = 300;

  const [timer, setTimer] = useState(gameDuration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((seconds: number) => seconds - 1);
      if (timer <= 0) {
        clearInterval(interval);
      }
    }, 1000);
    // else if (!isActive) {
    //   clearInterval(interval);
    // }
    return () => clearInterval(interval);
  }, [timer]);

  const progress = (timer / gameDuration) * 100;

  return (
    <div className="progress mb-2">
      <div
        className="progress-bar bg-info text-dark"
        role="progressbar"
        style={{ width: timer >= 0 ? `${progress}%` : "100%" }}
        aria-label="Game timer"
      >
        <ProgressBarDisplay timer={timer} />
      </div>
    </div>
  );
}

interface ProgressBarDisplayProps {
  timer: number;
}

function ProgressBarDisplay({ timer }: ProgressBarDisplayProps) {
  if (timer >= 0) {
    return (
      <div>
        <>
          <i className="fas fa-stopwatch" /> {getMinutes(timer)}:
          {getSeconds(timer)}
        </>
      </div>
    );
  } else {
    return (
      <span>
        <i className="fas fa-bell" /> Time&apos;s up! Who is the Spy?
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
