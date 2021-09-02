import React from "react";
import { Spacing } from "@ds.e/foundation";

export interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  bottom?: boolean;
  top?: boolean;
}

const Margin: React.FC<MarginProps> = ({
  space = "none",
  left = false,
  right = false,
  top = false,
  bottom = false,
  children,
}) => {
  let className = ``;
  if (left) {
    className = `${className} dse-margin-left-${space}`;
  }
  if (right) {
    className = `${className} dse-margin-right-${space}`;
  }
  if (top) {
    className = `${className} dse-margin-top-${space}`;
  }
  if (bottom) {
    className = `${className} dse-margin-bottom-${space}`;
  }
  if (!left && !right && !bottom && !top && space) {
    className = `dse-margin-${space}`;
  }
  return <div className={className}>{children}</div>;
};

export default Margin;
