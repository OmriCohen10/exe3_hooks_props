import React from "react";
import { useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { appContext } from "./context/AppContext";
import { Container } from "@mui/material";
import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import SystemAdmin from "./components/SystemAdmin";
import "./App.css";
import Navigation from "./components/Navigation";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d40",
    },
    secondary: {
      main: "#009688",
    },
    error: {
      main: "#d32f2f",
    },
    info: {
      main: "#90caf9",
    },
  },
});

function App() {
  const { route, loadUsers, usersList } = useContext(appContext);

  useEffect(() => {
    loadUsers();
  }, []);

  const loginNavConfig = [
    { value: "הירשם", route: "register", icon: <PersonAddIcon /> },
  ];
  const registerNavConfig = [
    { value: "חזור", route: "login", icon: <ArrowForwardIcon /> },
  ];

  const adminNavConfig = [
    { value: "חזור", route: "login", icon: <ArrowForwardIcon /> },
    { value: "התנתק", route: "login", icon: <LogoutIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ position: "relative", top: 20 }} maxWidth="md">
        {route === "login" ? (
          <>
            <Navigation configuration={loginNavConfig} />
            <Login />
          </>
        ) : route === "register" ? (
          <>
            <Navigation configuration={registerNavConfig} />
            <RegistrationForm />
          </>
        ) : route === "profile" ? (
          <Profile />
        ) : (
          <>
            <Navigation configuration={adminNavConfig} />
            <SystemAdmin />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
