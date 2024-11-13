import { memo } from "react";
// Font Awesome
import Parser from "html-react-parser";
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faSignOutAlt);
const signOutAltIcon = icon({ prefix: "fas", iconName: faSignOutAlt.iconName });

const DisconnectButton = memo(function DisconnectButton(props: {
  disconnectCallback: () => void;
}) {
  return (
    <div className="d-grid">
      <button
        className="btn btn-sm btn-danger"
        onClick={() => props.disconnectCallback()}
      >
        {Parser(signOutAltIcon.html.toString())} Leave lobby
      </button>
    </div>
  );
});

export default DisconnectButton;
