import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./styles/index.scss";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/atkinson-hyperlegible/700.css";

import Plausible from "plausible-tracker";
import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
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
