import React from "react";

interface ProgressBarProps {
  timer: number;
  gameDuration: number;
}

export default function ProgressBar({ timer, gameDuration }: ProgressBarProps) {
  const progress = (timer / gameDuration) * 100;

  return (
    <div className="progress mb-2" style={{ height: "2.5em" }}>
      <div
        className="progress-bar bg-info text-dark"
        role="progressbar"
        style={{ width: timer >= 0 ? `${progress}%` : "100%" }}
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
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
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds.toString;

  if (timer >= 0) {
    return (
      <span>
        <>
          <i className="fas fa-stopwatch" /> {minutesStr}:{secondsStr}
        </>
      </span>
    );
  } else {
    return (
      <span>
        <i className="fas fa-bell" /> Time&apos;s up! Who is the Spy?
      </span>
    );
  }
}
