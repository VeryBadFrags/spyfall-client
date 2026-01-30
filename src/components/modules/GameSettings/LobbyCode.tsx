import { useState } from "react";
import { useSessionIdStore } from "@store/store";
import { FaBuilding, FaCopy, FaShareAlt } from "react-icons/fa";
import Toast from "@components/Toast";

const canShare = typeof navigator !== "undefined" && !!navigator.share;

export default function LobbyCode() {
  const sessionId = useSessionIdStore((state) => state.sessionId);
  const [showToast, setShowToast] = useState(false);

  const getLobbyUrl = () =>
    `${window.location.origin}${window.location.pathname}#${sessionId}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(getLobbyUrl());
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: "Join my Spyfall lobby",
          text: `Join my Spyfall lobby with code: ${sessionId}`,
          url: getLobbyUrl(),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          await handleCopyLink();
        }
      }
    }
  };

  return (
    <div className="mb-2 d-flex align-items-center gap-2 flex-wrap">
      <div>
        <label htmlFor="lobby-display" className="form-label mb-0">
          <FaBuilding /> Lobby&nbsp;
        </label>
        <span
          id="lobby-code-badge"
          className="border border-secondary-subtle rounded-1 p-1 fs-5"
          title="Click to copy code"
          onClick={(event) => {
            window?.getSelection()?.selectAllChildren(event.target as Node);
            navigator.clipboard.writeText(sessionId).then();
          }}
        >
          {sessionId}
        </span>
      </div>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={handleCopyLink}
          title="Copy lobby link"
        >
          <FaCopy /> Copy link
        </button>
        {canShare && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleShare}
            title="Share lobby"
          >
            <FaShareAlt /> Share
          </button>
        )}
      </div>

      <Toast
        message="Link copied to clipboard!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
