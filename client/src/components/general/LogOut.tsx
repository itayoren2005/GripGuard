import { Avatar, IconButton, Tooltip } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../../context/RoleContext";

const LogOut: FC = () => {
  const roleContext = useRoleContext();
  const navigate = useNavigate();
  const logOut = () => {
    roleContext.setRole(null);
    navigate(`/home`);
  };

  return (
    <Tooltip classes={{ tooltip: "custom-tooltip" }} title="LogOut">
      <IconButton className="log-out-button" onClick={logOut}>
        <Avatar src="/gripGuard.png" />
      </IconButton>
    </Tooltip>
  );
};

export default LogOut;
