import React, { useState, useRef } from "react";
import {
  Box,
  Container,
  makeStyles,
  Button,
  Grid,
  Typography,
  Divider,
  withStyles,
} from "@material-ui/core";

import Page from "src/component/Page";
import StaticTable from "src/component/StaticTable";
import { useHistory } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    color: "#fff",
    padding: "23px 0 36px",
    "& button": {
      // marginRight: "10px",
      "&.active": {
        background:
          " linear-gradient(272.26deg, #DC668F 36.78%, #DA4378 86.13%)",
        color: "#fff",
        border: "2px solid #DE337A ",
      },
    },

    "& p": {
      fontSize: "16px",
      textTransform: "uppercase",
      color: "black",
    },
  },
  lockddataBtn: {
    margin: "20px 0px 30px",
    paddingBottom: "30px",
    borderBottom: "1px solid #16182e",
    textAlign: "center",
  },
  lockddata: {
    "& label": {
      fontSize: "16px",
      fontWeight: 800,
    },
    "& .output": {
      fontWeight: 300,
      color: "#ccc",
    },
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",

    "& .icon1": {
      height: "20px",
      paddingRight: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingRight: "7px",
      },
    },
    "& .icon2": {
      height: "20px",
      paddingLeft: "20px",
      [theme.breakpoints.only("xs")]: {
        width: "50px",
        height: "8px",
        paddingLeft: "7px",
      },
    },
  },
  divider: {
    marginTop: "10px",
    backgroundColor: "#F38500",
  },
}));

export default function () {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page title="Resource">
      <Box className={classes.mainBox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Resource Management
          </Typography>
        </Box>

        <Box mt={3} mb={3}>
          <StaticTable />
        </Box>
      </Box>
    </Page>
  );
}
