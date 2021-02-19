import React from "react";

function Chat(props) {
  if (props.gameMode) {
    return (
      <div class="col" id="chat-wrapper" style={{ display: "none" }}>
        <div class="card border-primary shadow">
          <div class="card-body">
            <div class="progress mb-2" style={{ height: "2.5em" }}>
              <div
                class="progress-bar bg-info text-dark"
                id="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                ⏱ 5:00
              </div>
            </div>
            <div class="row g-0">
              <div
                id="chat-box"
                class="chat-box card bg-light border-bottom-0 rounded-0 rounded-top pt-3"
              >
                <ul id="events" class="list"></ul>
              </div>
              <form id="talk-form">
                <div class="input-group">
                  <input
                    type="text"
                    id="chat-input"
                    class="form-control border-rounded-bottom-left"
                    placeholder="Message..."
                    autocomplete="off"
                    required
                    maxlength="64"
                  />
                  <button
                    type="submit"
                    id="chat-button"
                    class="btn btn-primary border-rounded-bottom-right"
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
