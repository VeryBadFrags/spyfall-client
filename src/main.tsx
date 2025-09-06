import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/index.scss";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/atkinson-hyperlegible/700.css";

import Plausible from "plausible-tracker";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";
const plausible = Plausible({
  domain: "spyfall.verybadfrags.com",
  apiHost: "/ps",
  hashMode: false,
});
plausible.trackPageview();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
);
