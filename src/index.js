import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./stylesheet/app.css";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#root")
);
