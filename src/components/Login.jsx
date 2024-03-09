import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import LayoutCenter from "./LayoutCenter";
import { valueValidation } from "../utilities/functions";
import { VALIDATIONS } from "../utilities/collections";
import { useContext } from "react";
import { appContext } from "../context/AppContext";
import DialogMessage from "./DialogMessage";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

export default function Login() {
  const { updateRoute, loginUser } = useContext(appContext);
  const [showDialog, setShowDialog] = useState(false);
  useEffect(() => {
    sessionStorage.setItem("currentUser", "undefined");
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    loginUser(data.username, data.password_1);
    if (sessionStorage.getItem("currentUser") === "undefined")
      setShowDialog(true);
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  return (
    <>
      {showDialog && (
        <DialogMessage
          openDialog={showDialog}
          closeDialog={handleCloseDialog}
          title="הודעת שגיאה!"
          closeBtn="הבנתי!"
          customStyle={{ marginY: 2, width: 100, marginX: "auto" }}
        >
          <Typography
            sx={{ margin: "0 auto", textAlign: "center" }}
            variant="h6"
            component="p"
          >
            שם משתמש או סיסמא אינם נכונים. אנא ודא שהזנת את פרטיך הנכונים.
          </Typography>
        </DialogMessage>
      )}
      <LayoutCenter title="התחברות">
        <form style={{ width: "90%" }} onSubmit={handleLogin}>
          <Paper elevation={3}>
            <Stack paddingX={2} paddingY={2}>
              <Stack spacing={4} paddingY={4} width="80%" marginX="auto">
                <TextInput
                  id="username"
                  name="username"
                  label="שדה חובה "
                  type="text"
                  color="success"
                  ph="שם משתמש"
                  defaultValue={""}
                  isValid={valueValidation}
                  errorMessage={VALIDATIONS.lastName.error}
                  icon={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <PasswordInput
                  id="password"
                  name="password_1"
                  label="שדה חובה "
                  ph="סיסמא"
                  inputProps={{ minLength: 7, maxLength: 12 }}
                  isValid={valueValidation}
                  errorMessage={VALIDATIONS.password_1.error}
                  defaultValue=""
                />
              </Stack>
              <Stack direction="row" paddingBottom={4} justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ marginLeft: 4 }}
                >
                  התחבר
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => updateRoute("register")}
                >
                  צור חשבון
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </form>
      </LayoutCenter>
    </>
  );
}
