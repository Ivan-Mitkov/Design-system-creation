import React from "react";

interface ButtonProps {
  label: string;
}
const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button className="dse-button__container">{label}</button>;
};

export default Button;
