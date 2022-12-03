import {
  Container,
  Box,
  Typography,
  makeStyles,
  Grid,
  Icon,
} from "@material-ui/core";
import React from "react";
import { GrConnectivity } from "react-icons/gr";

const useStyles = makeStyles((theme) => ({
  headingSection: {
    "& h2": {
      fontSize: "35px",
      lineHeight: "42px",
      fontWeight: "700",
      fontFamily: "'Red Rose', cursive",
    },
    "& h4": {
      fontSize: "24px",
      lineHeight: "32px",
      fontWeight: "700",
      fontFamily: "'Red Rose', cursive",
    },
  },
}));

export default function Heading({ data }) {
  const classes = useStyles();
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
       
        </Grid>
        <Grid item xs={12} sm={12}>
        
        </Grid>
      </Grid>
    </Box>
  );
}
