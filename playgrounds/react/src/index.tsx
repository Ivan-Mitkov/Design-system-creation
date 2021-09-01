import React from "react";
import ReactDOM from "react-dom";
import { Color, Spacing } from "@ds.e/react";
import "@ds.e/scss/lib/Utilities.css";

ReactDOM.render(
  <Color hexCode="#000" height={Spacing.sm} width={Spacing.sm} />,
  document.querySelector("#root")
);
