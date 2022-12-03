import { Container, Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  headingSection: {
    "& h1": {
      color: "#3a1354",
      fontSize: "54px",
      lineHeight: "72px",
      fontWeight: "700",
      fontFamily: "'Red Rose', cursive",
    },
  },
}));

export default function Heading({ data }) {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.headingSection}>
        <Typography variant="h1">{data}</Typography>
      </Box>
    </Box>
  );
}
