import { FC } from "react";
import { ButtonProps } from "./OrangeButton";
import "./general.css";

const BlueButton: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="blue-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default BlueButton;
