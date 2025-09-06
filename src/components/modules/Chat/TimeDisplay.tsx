import { FaBell, FaStopwatch } from "react-icons/fa";

function getMinutes(timer: number): string {
  const minutes = Math.floor(timer / 60);
  return minutes < 10 ? "0" + minutes : minutes.toString();
}

function getSeconds(timer: number): string {
  const seconds = timer % 60;
  return seconds < 10 ? "0" + seconds : seconds.toString();
}

export default function TimeDisplay(props: { timer: number }) {
  if (props.timer > 0) {
    return (
      <div>
        <>
          <FaStopwatch /> {getMinutes(props.timer)}:
          {getSeconds(props.timer)}
        </>
      </div>
    );
  } else {
    return (
      <span>
        <FaBell /> Time&apos;s up! Who is the Spy?
      </span>
    );
  }
}
