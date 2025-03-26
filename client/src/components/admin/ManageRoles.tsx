import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { changeRole, getUsersInfo, deleteUser } from "../../api/adminApi";
import "./admin.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { User } from "../../shared/Types";
import { OpenDialog, Role } from "../../shared/enums";
import DeleteIcon from "@mui/icons-material/Delete";

type ManageRolesProps = {
  onDialogClose: (close: string) => void;
};

const ManageRoles: FC<ManageRolesProps> = ({ onDialogClose }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersInfo = await getUsersInfo();
      setUsers(usersInfo);
    };
    getUsers();
  }, []);

  const handleClose = () => {
    setOpen(false);
    onDialogClose(OpenDialog.NONE);
  };

  const handleRoleChange = async (
    event: SelectChangeEvent<string>,
    selectedUser: User
  ) => {
    const newRole = event.target.value as Role;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === selectedUser.username
          ? { ...user, role: newRole }
          : user
      )
    );
    const updatedUser: User = {
      username: selectedUser.username,
      role: newRole,
    };
    await changeRole(updatedUser);
  };

  const handleDeleteUser = async (username: string) => {
    await deleteUser(username);
    const updatedUsers = users.filter(
      (filteredUser) => filteredUser.username !== username
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={(_, reason) => {
          if (reason === "backdropClick") {
            handleClose();
          }
        }}
        maxWidth="sm"
        fullWidth
        classes={{ paper: "dialog" }}
      >
        <DialogTitle className="dialog-title">Manage Roles</DialogTitle>
        <DialogContent>
          <List className="dialog-list">
            {users.map((user) => (
              <ListItem key={user.username} className="dialog-list-item">
                <ListItemText
                  primary={user.username}
                  className="username-text"
                />
                <IconButton
                  onClick={() => handleDeleteUser(user.username)}
                  className="icon-bright-button "
                  title="Delete"
                >
                  <DeleteIcon />
                </IconButton>
                <Select
                  value={user.role}
                  onChange={(event) => handleRoleChange(event, user)}
                  fullWidth
                  size="small"
                  className="role-select"
                >
                  <MenuItem value="admin">
                    <span className="menu-item-content">
                      <AdminPanelSettingsIcon />
                      Admin
                    </span>
                  </MenuItem>
                  <MenuItem value="observer">
                    <span className="menu-item-content">
                      <VisibilityIcon />
                      Observer
                    </span>
                  </MenuItem>
                  <MenuItem value="investigator">
                    <span className="menu-item-content">
                      <InsertInvitationIcon />
                      Investigator
                    </span>
                  </MenuItem>
                </Select>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions className="dialog-actions">
          <Button onClick={handleClose} className="dialog-button">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageRoles;
