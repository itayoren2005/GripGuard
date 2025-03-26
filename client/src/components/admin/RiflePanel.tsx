import { FC, useEffect, useState } from "react";
import "./admin.css";
import { getRifles } from "../../api/timelineApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import PowerIcon from "@mui/icons-material/Power";
import { addRifle, updateEnableRifle } from "../../api/adminApi";
import { Rifle } from "../../shared/Types";
import { OpenDialog } from "../../shared/enums";

type RiflePanelProps = {
  onDialogClose: (close: string) => void;
};

const RiflePanel: FC<RiflePanelProps> = ({ onDialogClose }) => {
  const [rifles, setRifles] = useState<Rifle[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const [clickedAdd, setClickedAdd] = useState<boolean>(false);
  const [newId, setNewId] = useState<number>(0);
  const [newAlias, setNewAlias] = useState<string>("");

  useEffect(() => {
    const getRifleData = async () => {
      const rifleData = await getRifles();
      setRifles(rifleData);
    };
    getRifleData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    onDialogClose(OpenDialog.NONE);
  };
  const handleAddButtonClick = () => {
    setClickedAdd(!clickedAdd);
  };
  const createRifle = async () => {
    const result = await addRifle({ id: newId, alias: newAlias, enable: true });
    if (result) {
      setRifles((prev) => [
        ...prev,
        { id: newId, alias: newAlias, enable: true },
      ]);
      setNewId(0);
      setNewAlias("");
      setClickedAdd(false);
    }
  };

  const handleEnableClick = async (id: number) => {
    if (await updateEnableRifle(id)) {
      setRifles(
        rifles.map((rifle) =>
          rifle.id === id ? { ...rifle, enable: !rifle.enable } : rifle
        )
      );
    }
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
        <DialogTitle className="dialog-title">Manage Rifle</DialogTitle>
        <DialogContent className="dialog-content">
          <List className="dialog-list">
            <ListItem className="dialog-list-item">
              <ListItemText className="list-title" primary="Rifles:" />
              <IconButton
                onClick={handleAddButtonClick}
                className="icon-bright-button "
                title="Create new"
              >
                <AddIcon />
              </IconButton>
            </ListItem>

            {rifles.map((rifle) => (
              <ListItem className="dialog-list-item" key={rifle.alias}>
                <ListItemText primary={rifle.alias} secondary={rifle.id} />
                {rifle.enable ? (
                  <IconButton
                    onClick={() => handleEnableClick(rifle.id)}
                    className="icon-bright-button "
                    title="enable"
                  >
                    <PowerIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => handleEnableClick(rifle.id)}
                    className="icon-bright-button "
                    title="disable"
                  >
                    <PowerOffIcon />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
          {clickedAdd && (
            <div className="create-rifle">
              <TextField
                label="Enter id address"
                maxRows={1}
                variant="standard"
                value={newId}
                onChange={(e) => setNewId(Number(e.target.value))}
              />
              <TextField
                label="Enter alias"
                maxRows={1}
                variant="standard"
                value={newAlias}
                onChange={(e) => setNewAlias(e.target.value)}
              />
              <Button
                onClick={createRifle}
                variant="text"
                className="create-button"
              >
                Create
              </Button>
            </div>
          )}
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

export default RiflePanel;
