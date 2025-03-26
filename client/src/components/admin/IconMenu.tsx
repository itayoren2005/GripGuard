import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoleContext } from "../../context/RoleContext";
import { Logout } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ManageRoles from "./ManageRoles";
import RiflePanel from "./RiflePanel";
import { OpenDialog } from "../../shared/enums";

const IconMenu: FC = () => {
  const roleContext = useRoleContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleManageRifleClick = () => {
    setOpenDialog(OpenDialog.RIFLE);
  };

  const handleManageRolesClick = () => {
    setOpenDialog(OpenDialog.ROLES);
  };

  const logOut = () => {
    roleContext.setRole(null);
    navigate(`/home`);
  };

  return (
    <div>
      {openDialog === "roles" && <ManageRoles onDialogClose={setOpenDialog} />}
      {openDialog === "rifle" && <RiflePanel onDialogClose={setOpenDialog} />}
      <Tooltip classes={{ tooltip: "custom-tooltip" }} title="Menu">
        <IconButton className="log-out-button" onClick={handleClick}>
          <Avatar src="/gripGuard.png" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={handleManageRifleClick}>
          <ListItemIcon>
            <AddCircleIcon fontSize="small" />
          </ListItemIcon>
          Manage rifle
        </MenuItem>

        <MenuItem onClick={handleManageRolesClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          Manage roles
        </MenuItem>
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default IconMenu;
