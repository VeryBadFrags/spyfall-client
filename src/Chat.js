import React, { useRef, useState } from "react";

export default function Chat(props) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.connectionManager.send("chat-event", { message: inputText });
    setInputText("");
  }

  if (props.gameMode) {
    return (
      <div className="col">
        <div className="card border-primary shadow">
          <div className="card-body">
            <ProgressBar />
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
                    ✉️ Send
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
  // TODO set color
  return (
    <li key={props.i} style={{}}>
      {props.row.author ? <b>{props.row.author}:</b> : null}{" "}
      <span style={{color: props.row.color}}>{props.row.text}</span>
    </li>
  );
}

function ProgressBar() {
  return (
    <div className="progress mb-2" style={{ height: "2.5em" }}>
      <div
        className="progress-bar bg-info text-dark"
        role="progressbar"
        style={{ width: "100%" }}
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        ⏱ 5:00
      </div>
    </div>
  );
}

// TODO
// const progressBar = document.getElementById("progress-bar");
// function startTimer(duration, display) {
//   clearInterval(intervalId);
//   var timer = duration;
//   setTimerDisplay(timer, duration, display);
//   intervalId = setInterval(function () {
//     timer--;
//     setTimerDisplay(timer, duration, display);
//     if (timer <= 0) {
//       display.textContent = "🔔 Time's up! Who is the Spy?";
//       display.setAttribute("aria-valuenow", 0);
//       display.style = `width: 100%;`;
//       clearInterval(intervalId);
//     }
//   }, 1000);
// }

// function setTimerDisplay(timer, totalDuration, display) {
//   let minutes = parseInt(timer / 60, 10);
//   let seconds = parseInt(timer % 60, 10);

//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;

//   display.textContent = `⏱ ${minutes}:${seconds}`;
//   let progress = (timer / totalDuration) * 100;
//   display.style = `width: ${progress}%;`;
//   display.setAttribute("aria-valuenow", Math.round(progress));
// }
