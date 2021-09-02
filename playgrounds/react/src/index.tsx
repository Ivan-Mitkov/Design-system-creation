import React from "react";
import ReactDOM from "react-dom";
import { Margin, Text } from "@ds.e/react";
import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/Text.css";

ReactDOM.render(
  <Margin right left bottom space="xxxl">
    <Text size="xl">This is some text</Text>
  </Margin>,
  document.querySelector("#root")
);
