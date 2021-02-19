import { useState } from "react";

function Error(props) {

  function resetErrors() {
    // let errorBox = document.getElementById("error");
    // errorBox.style.display = "none";
    // errorBox.innerHTML = "";
  }

  if (props.error) {
    return <div className="alert alert-danger mb-3">{props.error}</div>;
  } else {
    return null;
  }
}

export default Error;
