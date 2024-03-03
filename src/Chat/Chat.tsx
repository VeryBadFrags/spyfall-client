import "./Chat.scss";
import React, { useRef, useState } from "react";
import Card from "../Card";
import ProgressBar from "../ProgressBar/ProgressBar";
import { EventTypes } from "../types/eventTypes";
import type { ChatPayload } from "../types/chatPayload.type";

interface ChatProps {
  sendChatCallBack: (eventType: string, message: string) => void;
  chatContent: Array<ChatPayload>;
  gameStarted: boolean;
}

export default function Chat(props: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.sendChatCallBack(EventTypes.ChatEvent, inputText);
    // connectionManager.send(EventTypes.ChatEvent, { message: inputText });
    setInputText("");
    window.scrollTo(0, 0);
    (event.target as HTMLInputElement).focus();
  }

  return (
    <Card header="💬 Chat">
      {props.gameStarted ? <ProgressBar /> : null}
      <div className="row g-0">
        <div
          className="chat-box card border-bottom-0 rounded-0 rounded-top"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="list-group list-group-flush">
            {props.chatContent.map((row, i) => (
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
  row: ChatPayload;
}

function ChatLine({ row }: ChatLineProps) {
  return (
    <span className="list-group-item border-0">
      {row.author ? <b>{row.author}:</b> : null}{" "}
      <span style={{ color: row.color }}>{row.message}</span>
    </span>
  );
}
