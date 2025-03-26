import { FC, ComponentType } from "react";
import { Tooltip } from "@mui/material";
import "./general.css";

export type IconButtonProps = {
  onClick: () => void;
  className: string;
  icon: ComponentType;
  title: string;
};

const IconButton: FC<IconButtonProps> = ({
  onClick,
  className,
  icon: Icon,
  title,
}) => {
  return (
    <Tooltip classes={{ tooltip: "custom-tooltip" }} title={title}>
      <button className={className} onClick={onClick}>
        <Icon />
      </button>
    </Tooltip>
  );
};

export default IconButton;
