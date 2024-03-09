import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { appContext } from "../context/AppContext";

export default function Navigation({ configuration }) {
  const { updateRoute } = useContext(appContext);

  return (
    <Stack
      sx={{ marginBottom: 0, paddingX: 4, paddingY: 2, cursor: "pointer" }}
      direction="row"
    >
      {configuration.map((btn, i) => (
        <Button
          key={i}
          sx={{ gap: 1, fontSize: 20 }}
          variant="text"
          size="large"
          onClick={() => updateRoute(btn.route)}
          startIcon={btn.icon}
        >
          {btn.value}
        </Button>
      ))}
    </Stack>
  );
}
