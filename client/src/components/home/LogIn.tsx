import { Grid2, TextField } from "@mui/material";
import { FC, useState } from "react";
import {
  LOGIN_TEXT,
  USERNAME_LABEL,
  USERNAME_INSTRUCTIONS,
  PASSWORD_LABEL,
  PASSWORD_INSTRUCTIONS,
  LOGIN_UI_DIRECTIONS,
  ERROR_MISSING_CREDENTIALS,
} from "../../shared/Constants";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { logIn } from "../../api/registerApi";
import OrangeButton from "../general/OrangeButton";
import { useRoleContext } from "../../context/RoleContext";
import { Role } from "../../shared/enums";

const LoginPage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const roleContext = useRoleContext();
  const navigate = useNavigate();

  const navigateByRole = (role: Role) => {
    roleContext.setRole(role);
    navigate(`/${role}`);
  };

  const handleLogin = async () => {
    try {
      if (username && password) {
        const response = await logIn(username, password);
        sessionStorage.setItem("token", response.access_token);
        navigateByRole(response.role);
        setError(null);
      } else {
        setError(ERROR_MISSING_CREDENTIALS);
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };
  const focusPasswordInput = () => {
    document.getElementById("login-password")?.focus();
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
            id="login-password"
            label={PASSWORD_LABEL}
            placeholder={PASSWORD_INSTRUCTIONS}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="textfield"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </Grid2>
        <OrangeButton onClick={handleLogin} text={LOGIN_TEXT} />
        <Grid2>
          <h4>{LOGIN_UI_DIRECTIONS}</h4>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default LoginPage;
