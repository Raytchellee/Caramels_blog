import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <div id="main">
    <Routes />
    <ToastContainer />
  </div>,
  document.getElementById("root")
);
