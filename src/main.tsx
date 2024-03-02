import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./index.scss";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/atkinson-hyperlegible/700.css";

import Plausible from "plausible-tracker";
const plausible = Plausible({
  domain: "spy.verybadfrags.com",
  apiHost: "/ps",
  hashMode: false,
});
plausible.trackPageview();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
