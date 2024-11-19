import "./Chat.scss";
import React, { memo, useRef, useState } from "react";
import Card from "../Card";
import Timer from "./Timer";
import type { ChatPayload } from "../types/chatPayload.type";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { TimePayload } from "../types/timePayload.type";
import { ClientEvent } from "../types/clientEvent";
library.add(faPaperPlane);
const paperPlaneIcon = icon({ prefix: "fas", iconName: faPaperPlane.iconName });

interface ChatProps {
  sendChatCallBack: (eventType: ClientEvent, message: string) => void;
  chatContent: Array<ChatPayload>;
  gameStarted: boolean;
  serverTime: TimePayload;
  identity: string;
}

const Chat = memo(function Chat(props: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function handleChatSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.sendChatCallBack(ClientEvent.ChatEvent, inputText);
    setInputText("");
    // document.getElementById("chat-container")?.scrollIntoView();
    document.getElementById("chat-input")?.focus();
  }

  return (
    <Card header="💬 Chat">
      {props.gameStarted ? <Timer serverTime={props.serverTime} /> : null}
      <div className="row g-0" id="chat-container">
        <div className="chat-box card border-bottom-0 rounded-0 rounded-top">
          <div className="list-group list-group-flush">
            {props.chatContent.map((row, i) => (
              <ChatLine row={row} key={i} />
            ))}
          </div>
        </div>
        <form onSubmit={handleChatSend}>
          <div className="input-group">
            <label htmlFor="chat-input" hidden={true}>
              Send message
            </label>
            <input
              type="text"
              id="chat-input"
              className="form-control rounded rounded-top-0 rounded-end-0"
              placeholder="Message..."
              autoComplete="off"
              // autoFocus={
              //   props.chatContent.length > 0 &&
              //   props.chatContent[props.chatContent.length - 1].author
              //     ?.avatar === props.identity
              // }
              required
              maxLength={32}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              ref={inputRef}
            />
            <button
              type="submit"
              className="btn btn-primary rounded rounded-top-0 rounded-start-0"
            >
              {Parser(paperPlaneIcon.html.toString())} Send
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
});

const ChatLine = memo(function ChatLine(props: { row: ChatPayload }) {
  return (
    <span className="list-group-item border-0">
      {props.row.author ? <b>{props.row.author.name}:</b> : null}{" "}
      <span style={{ color: props.row.color }}>{props.row.message}</span>
    </span>
  );
});

export default Chat;
