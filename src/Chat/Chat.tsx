import "./Chat.css";
import React, { useEffect, useRef, useState } from "react";
import Card from "../Card";
import ProgressBar from "./ProgressBar";
import { ChatRowType } from "../Types";

interface ChatProps {
  connectionManager: any;
  chatContent: Array<ChatRowType>;
  gameDuration: number;
  timer: any;
  setTimer: any;
  isActive: any;
}

export default function Chat({
  connectionManager,
  chatContent,
  gameDuration,
  timer,
  setTimer,
  isActive,
}: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef: any = useRef();

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((seconds: number) => seconds - 1);
        if (timer <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
    // else if (!isActive) {
    //   clearInterval(interval);
    // }
    return () => clearInterval(interval);
  }, [timer, setTimer, isActive]);

  function handleSubmit(event: any) {
    event.preventDefault();
    connectionManager.send("chat-event", { message: inputText });
    setInputText("");
    window.scrollTo(0, 0);
    event.target.focus();
  }

  return (
    <Card className="border-primary">
      <ProgressBar timer={timer} gameDuration={gameDuration} />
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
