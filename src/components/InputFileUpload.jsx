import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
});

export default function InputFileUpload() {
  return (
    <Button
      sx={{ gap: 2 }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      endIcon={<CloudUploadIcon />}
    >
      תמונת פרופיל
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        id="userImage"
        name="userImage"
      />
    </Button>
  );
}
