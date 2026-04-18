import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Header from "@components/layout/Header/Header";
import Footer from "@components/layout/Footer/Footer";

import "./styles/index.scss";
import "@fontsource/atkinson-hyperlegible";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/space-grotesk/600.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <App />
    <Footer />
  </React.StrictMode>,
);
