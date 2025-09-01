import { create } from "zustand";
import { useEffect, useState } from "react";
import { TimePayload } from "../types/timePayload.type";
import TimeDisplay from "./TimeDisplay.tsx";

interface TimerState {
  serverTime: TimePayload;
  setServerTime: (data: TimePayload) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  serverTime: {
    durationSec: 0,
    timeLeftSec: 0,
  },
  setServerTime: (data: TimePayload) =>
    set(() => {
      return { serverTime: data };
    }),
}));

const Timer = function Timer() {
  const serverTime = useTimerStore((state) => state.serverTime)
  const [timer, setTimer] = useState(serverTime.timeLeftSec);

  useEffect(() => {
    setTimer(serverTime.timeLeftSec);
  }, [serverTime]);

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
              ? `${(timer / serverTime.durationSec) * 100}%`
              : "100%",
        }}
        aria-label="Game timer"
      >
        <TimeDisplay timer={timer} />
      </div>
    </div>
  );
};

export default Timer;
