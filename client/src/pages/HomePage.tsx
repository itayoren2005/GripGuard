import { Grid2 } from "@mui/material";
import SignUpPage from "../components/home/SignUp";
import "../components/home/home.css";
import { FC, useState } from "react";
import LoginPage from "../components/home/LogIn";
import {
  ABOUT_TEXT,
  LOGIN_TEXT,
  SIGNUP_TEXT,
  WELCOME_TEXT,
} from "../shared/Constants";
import BlueButton from "../components/general/BlueButton";
const HomePage: FC = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const handleSetHasAccount = () => {
    setHasAccount(!hasAccount);
  };
  return (
    <Grid2 className="home-paper">
      <Grid2 className="register-part">
        <Grid2 className="register">
          {hasAccount ? <LoginPage /> : <SignUpPage />}
          {hasAccount ? (
            <BlueButton onClick={handleSetHasAccount} text={SIGNUP_TEXT} />
          ) : (
            <BlueButton onClick={handleSetHasAccount} text={LOGIN_TEXT} />
          )}
        </Grid2>
      </Grid2>
      <Grid2 className="land-part">
        <Grid2 className="land">
          <h1 className="title">{WELCOME_TEXT}</h1>
          <h5 className="about">{ABOUT_TEXT}</h5>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
export default HomePage;
