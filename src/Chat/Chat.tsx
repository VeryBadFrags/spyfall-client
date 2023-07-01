import "./Chat.css";
import React, { useRef, useState } from "react";
import Card from "../Card";
import ProgressBar from "../ProgressBar/ProgressBar";
import { ChatRowType } from "../Types";
import ConnectionManager from "../utils/connection-manager";

interface ChatProps {
  connectionManager: ConnectionManager;
  chatContent: Array<ChatRowType>;
}

export default function Chat({ connectionManager, chatContent }: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef: any = useRef();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    connectionManager.send("chat-event", { message: inputText });
    setInputText("");
    window.scrollTo(0, 0);
    (event.target as HTMLInputElement).focus();
  }

  return (
    <Card className="border-primary">
      <ProgressBar />
      <div className="row g-0">
        <div
          className="chat-box card border-bottom-0 rounded-0 rounded-top"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="list-group list-group-flush">
            {chatContent.map((row, i) => (
              <ChatLine row={row} key={i} />
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control border-rounded-bottom-left"
              placeholder="Message..."
              autoComplete="off"
              required
              maxLength={32}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              ref={inputRef}
            />
            <button
              type="submit"
              className="btn btn-primary border-rounded-bottom-right"
            >
              <i className="fas fa-paper-plane" /> Send
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
}

interface ChatLineProps {
  row: ChatRowType;
}

function ChatLine({ row }: ChatLineProps) {
  return (
    <span className="list-group-item">
      {row.author ? <b>{row.author}:</b> : null}{" "}
      <span style={{ color: row.color }}>{row.text}</span>
    </span>
  );
}
