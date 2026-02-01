import { create } from "zustand";
import { useEffect, useRef, useState } from "react";
import type { TimePayload } from "../../../types/timePayload.type";
import TimeDisplay from "./TimeDisplay";
import { useToastStore } from "@store/store";

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

export default function Timer() {
  const serverTime = useTimerStore((state) => state.serverTime);
  const [timer, setTimer] = useState(serverTime.timeLeftSec);
  const showToast = useToastStore((state) => state.showToast);

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

  useEffect(() => {
    if (timer === 30) {
      showToast("⏰ 30 seconds left! Time to vote!", "warning");
    }
    if (timer === 0 && serverTime.timeLeftSec > 0) {
      showToast("⏰ Time's up! Vote now!", "danger");
    }
  }, [timer, serverTime.timeLeftSec, showToast]);

  return (
    <div className="progress mb-2">
      <div
        className={`progress-bar ${timer <= 0 ? "bg-danger text-light" : "bg-info text-dark"}`}
        role="progressbar"
        style={{
          width:
            timer >= 0 ? `${(timer / serverTime.durationSec) * 100}%` : "100%",
        }}
        aria-label="Game timer"
      >
        <TimeDisplay timer={timer} />
      </div>
    </div>
  );
}
