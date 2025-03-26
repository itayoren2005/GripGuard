import {
  Grid2,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SIGNUP_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  SIGNIN_UI_DIRECTIONS,
} from "../../shared/Constants";
import "./home.css";
import { signUp } from "../../api/registerApi";
import OrangeButton from "../general/OrangeButton";
import { useRoleContext } from "../../context/RoleContext";
import { Role } from "../../shared/enums";

const SignUpPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const roleContext = useRoleContext();
  const navigate = useNavigate();

  const navigateByRole = (role: Role) => {
    roleContext.setRole(role);
    navigate(`/${role}`);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value as string);
  };
  const handleRegistration = async () => {
    try {
      if (!username || !password || !selectedRole) {
        setError("Please enter username password and role.");
        return;
      }

      const response = await signUp(username, password, selectedRole);
      sessionStorage.setItem("token", response.access_token);
      navigateByRole(response.role);
      setError(null);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during registration.");
      }
    }
  };

  const focusPasswordInput = () => {
    document.getElementById("signup-password")?.focus();
  };
  return (
    <Grid2 container className="root" alignItems="center">
      <Grid2 container direction="column" alignItems="center" spacing={2}>
        <img className="user-icon" src="/user.png" />
        {error && <p className="error">{error}</p>}
        <Grid2>
          <TextField
            label={USERNAME_LABEL}
            placeholder={USERNAME_INSTRUCTIONS}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="textfield"
            onKeyDown={(e) => e.key === "Enter" && focusPasswordInput()}
          />
        </Grid2>
        <Grid2>
          <TextField
            id="signup-password"
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_INSTRUCTIONS}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="textfield"
          />
        </Grid2>
        <FormControl fullWidth className="form-control">
          <InputLabel id="demo-simple-select-label">role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={selectedRole}
            label="role"
            onChange={handleChange}
          >
            <MenuItem value={Role.OBSERVER}>observer</MenuItem>
            <MenuItem value={Role.INVESTIGATOR}>investigator</MenuItem>
          </Select>
        </FormControl>

        <OrangeButton onClick={handleRegistration} text={SIGNUP_TEXT} />

        <Grid2>
          <h4>{SIGNIN_UI_DIRECTIONS}</h4>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default SignUpPage;
