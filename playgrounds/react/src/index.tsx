import React from "react";
import ReactDOM from "react-dom";
import { Select } from "@ds.e/react";
import "@ds.e/scss/lib/Utilities.css";
import "@ds.e/scss/lib/Margin.css";
import "@ds.e/scss/lib/Text.css";
import "@ds.e/scss/lib/Select.css";
const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];
ReactDOM.render(
  <div style={{ margin: "50px" }}>
    <Select
      options={options}
      ////use this if we want to override something
      // renderOption={({ option, getOptionRecommendedProps }) => {
      //   return <p {...getOptionRecommendedProps()}>{option.label}</p>;
      // }}
    />
  </div>,
  document.querySelector("#root")
);
