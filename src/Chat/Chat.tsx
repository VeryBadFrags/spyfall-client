import "./Chat.scss";
import React, { memo, useRef, useState } from "react";
import Card from "../Card";
import Timer from "./Timer";
import { EventTypes } from "../types/eventTypes";
import type { ChatPayload } from "../types/chatPayload.type";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { TimePayload } from "../types/timePayload.type";
library.add(faPaperPlane);
const paperPlaneIcon = icon({ prefix: "fas", iconName: faPaperPlane.iconName });

interface ChatProps {
  sendChatCallBack: (eventType: string, message: string) => void;
  chatContent: Array<ChatPayload>;
  gameStarted: boolean;
  serverTime: TimePayload;
  identity: string;
}

const Chat = memo(function Chat(props: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.sendChatCallBack(EventTypes.ChatEvent, inputText);
    // connectionManager.send(EventTypes.ChatEvent, { message: inputText });
    setInputText("");
    // window.scrollTo(0, 0);
    // (event.target as HTMLInputElement).focus();
  }

  return (
    <Card header="💬 Chat">
      {props.gameStarted ? <Timer serverTime={props.serverTime} /> : null}
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
              autoFocus={
                props.chatContent.length > 0 &&
                props.chatContent[props.chatContent.length - 1].author
                  ?.avatar == props.identity
              }
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
              {Parser(paperPlaneIcon.html.toString())} Send
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
});

function ChatLine(props: { row: ChatPayload }) {
  return (
    <span className="list-group-item border-0">
      {props.row.author ? <b>{props.row.author.name}:</b> : null}{" "}
      <span style={{ color: props.row.color }}>{props.row.message}</span>
    </span>
  );
}

export default Chat;
