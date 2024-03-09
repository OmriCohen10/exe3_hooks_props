import React, { useEffect, useState } from "react";
import LayoutCenter from "./LayoutCenter";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import InputFileUpload from "./InputFileUpload";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import { VALIDATIONS, citiesList } from "../utilities/collections";
import { valueValidation } from "../utilities/functions";
import { useContext } from "react";
import { appContext } from "../context/AppContext";
import DialogMessage from "./DialogMessage";

export default function RegistrationForm() {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [inputValue, setInputValue] = useState(null);

  const { registerUser, usersList } = useContext(appContext);

  useEffect(() => {
    // if errors object is empty its mean that there aren't any errors.
    if (Object.keys(errors).length === 0 && isSubmitting) {
      finishSubmit();
    }
  }, [errors]);

  // if all inputs passed validation successfully finish the submission.
  function finishSubmit() {
    registerUser(userData);
    setIsSubmitting(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.userImage = imageUrl;
    setUserData(data);

    // inputs validations.
    if (isUserExists(data.email)) {
      setErrorMsg(
        `כתובת האימייל: ${data.email} כבר רשומה במערכת. יש להזין כתובת אימייל חדשה.`
      );
      setShowDialog(true);
      return;
    }

    if (data.password_1 !== data.password_2) {
      setErrorMsg("אימות סיסמא נכשל. אנא וודאו שהסיסמאות שהזנתם אכן תואמות.");
      setShowDialog(true);
      return;
    }

    let errorsIndicator = {};

    if (!VALIDATIONS.firstName.regex.test(data.firstName))
      errorsIndicator.firstName = "";
    if (!VALIDATIONS.lastName.regex.test(data.lastName))
      errorsIndicator.lastName = "";
    if (!VALIDATIONS.street.regex.test(data.street))
      errorsIndicator.street = "";
    if (!VALIDATIONS.flatNumber.regex.test(data.flatNumber))
      errorsIndicator.flatNumber = "";
    if (!VALIDATIONS.username.regex.test(data.username))
      errorsIndicator.username = "";
    if (!VALIDATIONS.email.regex.test(data.email)) errorsIndicator.email = "";
    if (!VALIDATIONS.password_1.regex.test(data.password_1))
      errorsIndicator.password_1 = "";
    if (!VALIDATIONS.password_2.regex.test(data.password_2))
      errorsIndicator.password_2 = "";
    if (!handleBDayChange({ value: data.bDay })) errorsIndicator.bDay = "";

    setErrors(errorsIndicator);
    if (Object.keys(errorsIndicator).length > 0) {
      setErrorMsg("יש לשים לב שכל השדות חוקיים על מנת לסיים את הרישום.");
      setShowDialog(true);
    }
    setIsSubmitting(true);
  }

  function isUserExists(email) {
    const existingUserIndex = usersList.findIndex(
      (user) => user.email === email
    );
    // if user doesn't exist in users list.
    if (existingUserIndex === -1) return false;
    else return true;
  }

  function handelImageUpload(imageObj) {
    // image file validation.
    if (!imageObj.name) return;
    const extension = imageObj.name.split(".")[1];
    if (!(extension === "jpg" || extension === "jpeg"))
      setImageMessage(
        'קובץ התמונה לא חוקי. יש לוודא שהתמונה שבחרת נגמרת באחד משני הסיומות הבאות: "jpg" , "jpeg" '
      );
    else {
      // read image url from file object
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(imageObj);
      setImageMessage(imageObj.name);
    }
  }

  function handleBDayChange(currentInput) {
    const bDay = currentInput.value;
    const currentYear = new Date().getFullYear();
    const bDayYear = bDay.split("-")[0];
    const diff = currentYear - bDayYear;
    if (diff > 18 && diff < 120) return true;
    else return false;
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  return (
    <LayoutCenter title="הרשמה">
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
            {errorMsg}
          </Typography>
        </DialogMessage>
      )}
      <form style={{ width: "100%", marginBottom: 20 }} onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "0 auto 30px",
            width: "100%",
          }}
        >
          <Stack paddingX={3} paddingY={4} gap="10px" width="350px">
            <TextInput
              id="firstName"
              name="firstName"
              label="שם פרטי"
              type="text"
              color="success"
              isValid={valueValidation}
              errorMessage={VALIDATIONS.firstName.error}
              defaultValue={""}
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="שם משפחה"
              type="text"
              color="success"
              isValid={valueValidation}
              errorMessage={VALIDATIONS.lastName.error}
              defaultValue={""}
            />
            <FormHelperText
              sx={{ marginLeft: "10px", textAlign: "right" }}
              id="outlined-bDay"
              color="success"
            >
              תאריך לידה
            </FormHelperText>
            <TextInput
              id="bDay"
              name="bDay"
              type="date"
              color="success"
              isValid={handleBDayChange}
              errorMessage={VALIDATIONS.bDay.error}
              defaultValue={""}
            />
            <Autocomplete
              options={citiesList}
              autoSelect={true}
              sx={{ width: 300 }}
              onChange={(event, newValue) => setInputValue(newValue)}
              value={inputValue}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="עיר"
                  name="city"
                  required={true}
                />
              )}
            />
            <TextInput
              id="street"
              name="street"
              label="רחוב"
              type="text"
              color="success"
              isValid={valueValidation}
              errorMessage={VALIDATIONS.street.error}
              defaultValue={""}
            />
            <TextInput
              id="flatNumber"
              name="flatNumber"
              label="מס' דירה"
              type="number"
              color="success"
              isValid={valueValidation}
              errorMessage={VALIDATIONS.flatNumber.error}
              defaultValue={""}
            />
          </Stack>
          <Stack paddingX={3} paddingY={4} gap="10px" width="350px">
            <TextInput
              id="username"
              name="username"
              label="שם משתמש"
              type="text"
              color="success"
              inputProps={{ maxLength: 60 }}
              isValid={valueValidation}
              errorMessage={VALIDATIONS.username.error}
              defaultValue={""}
            />
            <TextInput
              id="email"
              name="email"
              label="אימייל"
              type="email"
              color="success"
              isValid={valueValidation}
              errorMessage={VALIDATIONS.email.error}
              defaultValue={""}
            />
            <PasswordInput
              id="password_1"
              name="password_1"
              label="סיסמא"
              inputProps={{ minLength: 7, maxLength: 12 }}
              isValid={valueValidation}
              errorMessage={VALIDATIONS.password_1.error}
              defaultValue={""}
            />
            <PasswordInput
              id="password_2"
              name="password_2"
              label="אישור סיסמא"
              inputProps={{ minLength: 7, maxLength: 12 }}
              isValid={valueValidation}
              errorMessage={VALIDATIONS.password_2.error}
              defaultValue={""}
            />
            <FormControl
              id="userImage"
              name="userImage"
              fullWidth
              variant="filled"
              onChange={(e) => handelImageUpload(e.target.files[0])}
            >
              <InputFileUpload />
            </FormControl>
            {imageMessage !== null && (
              <Typography
                sx={{ width: "100%", margin: "0 auto", textAlign: "center" }}
                variant="subtitle1"
                component="p"
                color={imageMessage.includes("סיומות") ? "error" : "success"}
              >
                {imageMessage}
              </Typography>
            )}
          </Stack>
        </Paper>
        <Button
          sx={{ width: "100%", fontSize: 20 }}
          variant="contained"
          color="success"
          type="submit"
        >
          צור חשבון
        </Button>
      </form>
    </LayoutCenter>
  );
}
