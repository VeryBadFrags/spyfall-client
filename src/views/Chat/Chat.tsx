import "./Chat.scss";
import React, { useRef, useState } from "react";
import { create } from "zustand";
import Card from "@components/Card";
import Timer from "./Timer";
import type { ChatPayload } from "../../types/chatPayload.type";
import { ClientEvent } from "../../types/clientEvent";
import { useLobbyStore } from "@store/store";

// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
library.add(faPaperPlane);
const paperPlaneIcon = icon({ prefix: "fas", iconName: faPaperPlane.iconName });

const chatSize = 8;

interface CrossedState {
  chatContent: Array<ChatPayload>;
  setChatContent: (content: Array<ChatPayload>) => void;
  appendChat: (newContent: ChatPayload) => void;
}
export const useChatStore = create<CrossedState>((set) => ({
  chatContent: [],
  setChatContent: (content: Array<ChatPayload>) =>
    set(() => {
      return { chatContent: content };
    }),
  appendChat: (newContent: ChatPayload) =>
    set((state) => {
      let updatedChat: Array<ChatPayload>;
      if (state.chatContent.length >= chatSize) {
        // Trim the chat if it's too long
        updatedChat = [
          ...state.chatContent.splice(
            state.chatContent.length - chatSize + 1,
            state.chatContent.length,
          ),
          newContent,
        ];
      } else {
        updatedChat = [...state.chatContent, newContent];
      }

      return { chatContent: updatedChat };
    }),
}));

interface ChatProps {
  sendChatCallBack: (eventType: ClientEvent, message: string) => void;
}

const Chat = function Chat(props: ChatProps) {
  const [inputText, setInputText] = useState("");
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const gameStarted = useLobbyStore((state) => state.gameStarted);
  const chatContent = useChatStore((state) => state.chatContent);

  function handleChatSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.sendChatCallBack(ClientEvent.ChatEvent, inputText);
    setInputText("");
    // document.getElementById("chat-container")?.scrollIntoView();
    document.getElementById("chat-input")?.focus();
  }

  return (
    <Card header="💬 Chat">
      {gameStarted ? <Timer /> : null}
      <div className="row g-0" id="chat-container">
        <div className="chat-box card border-bottom-0 rounded-0 rounded-top">
          <div className="list-group list-group-flush">
            {chatContent.map((row, i) => (
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
};

const ChatLine = function ChatLine(props: { row: ChatPayload }) {
  return (
    <span className="list-group-item border-0">
      {props.row.author ? <b>{props.row.author.name}:</b> : null}{" "}
      <span style={{ color: props.row.color }}>{props.row.message}</span>
    </span>
  );
};

export default Chat;
