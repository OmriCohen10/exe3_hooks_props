import React from "react";
import { Box, Typography } from "@mui/material";

export default function LayoutCenter({ children, title, greet }) {
  return (
    <Box>
      {greet && (
        <Typography sx={{ marginRight: 7, marginBottom: 3 }} variant="h5">
          {greet}
        </Typography>
      )}
      <Typography
        variant="h3"
        component="h2"
        gutterBottom={true}
        align="center"
        sx={{
          textDecoration: "underline",
          color: "#00352c",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
