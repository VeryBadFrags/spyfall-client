import React, { useState } from "react";

function Chat(props) {
  const [inputText, setInputText] = useState("");

  function clearChat() {
    // TODO
    // for (let i = eventsBox.childNodes.length - 1; i >= 0; i--) {
    //   eventsBox.removeChild(eventsBox.childNodes[0]);
    // }
  }

  // let newLine = document.createElement("li");
  // if (author) {
  //   let authorElem = document.createElement("b");
  //   authorElem.innerText = `${author}: `;
  //   newLine.appendChild(authorElem);
  // }
  // let textElem = document.createElement("span");
  // textElem.innerText = text;
  // newLine.appendChild(textElem);
  // if (color) {
  //   newLine.style.color = color;
  // }
  // eventsBox.appendChild(newLine);
  // if (eventsBox.childNodes.length > 11) {
  //   eventsBox.removeChild(eventsBox.childNodes[0]);
  // }

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
            <div className="row g-0">
              <div className="chat-box card bg-light border-bottom-0 rounded-0 rounded-top pt-3">
                <ul className="list">
                  {props.chatContent.map((row, i) => (
                    <li key={i}>{row.text}</li>
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

export default Chat;
