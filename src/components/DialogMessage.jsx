import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
export default function DialogMessage({
  openDialog,
  closeDialog,
  title,
  children,
  closeBtn,
  customStyle,
}) {
  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={openDialog}
        onClose={closeDialog}
      >
        <DialogTitle
          color="primary"
          sx={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
          <Box sx={customStyle}>
            <Button
              sx={{ width: 100, fontSize: 20}}
              variant="contained"
              color="success"
              onClick={closeDialog}
            >
              {closeBtn}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
