import React, { useEffect, useRef, useState } from "react";

const gameDuration = 300;

export default function Chat(props) {
  const [inputText, setInputText] = useState("");
  const [timer, setTimer] = useState(gameDuration);
  const inputRef = useRef();

  useEffect(() => {
    let interval = null;
    if (props.isActive) {
      interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
    } else if (!props.isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.isActive, timer]);

  function handleSubmit(event) {
    event.preventDefault();
    props.connectionManager.send("chat-event", { message: inputText });
    setInputText("");
  }

  function startTimer(duration) {
    clearInterval(props.intervalId);
      //     if (timer <= 0) {
      //       display.textContent = "🔔 Time's up! Who is the Spy?";
      //       display.setAttribute("aria-valuenow", 0);
      //       display.style = `width: 100%;`;
      //       clearInterval(intervalId);
      //     }
  }

  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-primary shadow">
          <div className="card-body">
            <ProgressBar timer={timer} />
            <div className="row g-0">
              <div
                className="chat-box card bg-light border-bottom-0 rounded-0 rounded-top pt-3"
                onClick={() => inputRef.current.focus()}
              >
                <ul className="list">
                  {props.chatContent.map((row, i) => (
                    <ChatLine row={row} i={i} />
                  ))}
                </ul>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-rounded-bottom-left"
                    placeholder="Message..."
                    autoComplete="off"
                    required
                    maxLength="64"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    ref={inputRef}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary border-rounded-bottom-right"
                  >
                    <i class="fas fa-paper-plane"></i> Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function ChatLine(props) {
  return (
    <li key={props.i}>
      {props.row.author ? <b>{props.row.author}:</b> : null}{" "}
      <span style={{ color: props.row.color }}>{props.row.text}</span>
    </li>
  );
}

function ProgressBar({ timer }) {
  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  let progress = (timer / gameDuration) * 100;
  //   display.setAttribute("aria-valuenow", Math.round(progress));

  return (
    <div className="progress mb-2" style={{ height: "2.5em" }}>
      <div
        className="progress-bar bg-info text-dark"
        role="progressbar"
        style={{ width: `${progress}%` }}
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span>
          <i class="fas fa-stopwatch"></i> {minutes}:{seconds}
        </span>
      </div>
    </div>
  );
}
