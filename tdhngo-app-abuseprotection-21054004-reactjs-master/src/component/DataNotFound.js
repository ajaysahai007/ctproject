import { Box, Typography } from "@material-ui/core";
import React from "react";

export default function DataNotFound(color = "#fff") {
  return (
    <Box
      style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}
    >
      <Typography style={{ color: "black", fontSize: "16px" }}>
        No data found
      </Typography>
    </Box>
  );
}
