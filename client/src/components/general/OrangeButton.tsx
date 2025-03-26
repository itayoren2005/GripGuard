import { FC } from "react";
import "./general.css";

export type ButtonProps = {
  onClick: () => void;
  text: string;
};

const OrangeButton: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="orenge-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default OrangeButton;
