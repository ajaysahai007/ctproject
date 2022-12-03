import {
  Box,
  Button,
  Grid,
  makeStyles,
  Typography,
  Divider,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Userlist from "../Userlist";
import { useHistory } from "react-router-dom";
import Pressandmediatable from "src/component/Pressandmediatable";
import Page from "src/component/Page";

import StaticTable from "src/component/StaticTable";
import StaticContentTable from "src/component/StaticContentTable";
const useStyles = makeStyles((theme) => ({
  devicelistHeading: {
    // paddingTop: "2rem",
    paddingTop: "23px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    "& h3": {
      padding: "1rem 0",
      color: theme.palette.text.black,
    },
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
    "& h2": {
      padding: "1rem 0",
      color: theme.palette.text.black,

      fontSize: "22px",
    },
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
    marginBottom: "30px",
  },
  liningall: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  btnSubAdmin: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "end",
    "& button": {},
  },
}));

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page title="Content">
      <Grid container spacing={3}>
        <Grid sm={12} lg={12} md={12}></Grid>
        <Grid item xs={12} sm={12}>
          <Box className={classes.liningall}>
            <Box className={classes.devicelistHeading}>
              <Typography variant="h1" className="headingText">
                Content Management
              </Typography>
            </Box>
          </Box>
          <Divider className={classes.divider} />

          <Box>{/*   */}</Box>
          {/* <StaticTable /> */}
          <StaticContentTable />
        </Grid>
      </Grid>
    </Page>
  );
}
