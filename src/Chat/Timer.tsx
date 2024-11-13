import { memo, useEffect, useState } from "react";
import { TimePayload } from "../types/timePayload.type";
import TimeDisplay from "./TimeDisplay.tsx";

const Timer = memo(function Timer(props: { serverTime: TimePayload }) {
  const [timer, setTimer] = useState(props.serverTime.timeLeftSec);

  useEffect(() => {
    setTimer(props.serverTime.timeLeftSec);
  }, [props.serverTime]);

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
          width:
            timer >= 0
              ? `${(timer / props.serverTime.durationSec) * 100}%`
              : "100%",
        }}
        aria-label="Game timer"
      >
        <TimeDisplay timer={timer} />
      </div>
    </div>
  );
});

export default Timer;
