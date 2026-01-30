import { useSessionIdStore, useToastStore } from "@store/store";
import { FaBuilding, FaCopy, FaShareAlt } from "react-icons/fa";

const canShare = typeof navigator !== "undefined" && !!navigator.share;

export default function LobbyCode() {
  const sessionId = useSessionIdStore((state) => state.sessionId);
  const showToast = useToastStore((state) => state.showToast);

  const getLobbyUrl = () =>
    `${window.location.origin}${window.location.pathname}#${sessionId}`;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(sessionId);
    showToast("Code copied to clipboard!");
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(getLobbyUrl());
    showToast("Link copied to clipboard!");
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
          className="border border-secondary-subtle rounded-1 p-1 fs-5 clickable"
          title="Click to copy code"
          onClick={(event) => {
            window?.getSelection()?.selectAllChildren(event.target as Node);
            handleCopyCode();
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
    </div>
  );
}
