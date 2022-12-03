import React, { useState, useEffect } from "react";
import { Box, Typography, Divider, Button } from "@material-ui/core";
import Page from "src/component/Page";
import { makeStyles } from "@material-ui/core";
import apiConfig from "src/APIconfig/ApiConfig";
import axios from "axios";

import { useHistory } from "react-router-dom";
import ActivityTable from "./ActivityTable";
import ActivityMainTable from "./ActivityMainTable";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: 0,
  },
  inputAdornment: {
    backgroundColor: "#f5d5da",
    height: 40,
    maxHeight: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainbox: {
    padding: "23px 0 36px",
  },
  devicelistHeading: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  },
  buttonApprove: {
    borderRadius: "5px",
    minHeight: "34px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(228, 106, 118)",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "500",
    transition: "0.26s ease",
    paddingBottom: "3px",
    textTransform: "capitalize",
    marginRight: "15px",
    backgroundColor: "rgb(3, 201, 215)",
  },
  divider: {
    marginTop: "10px",
    background: "#F38500",
  },
}));

export default function () {
  const [isLoading, setLoader] = useState(false);
  const [_useriid, setUserId] = useState();
  const [_datafound, setNotFount] = useState(true);

  const classes = useStyles();
  const history = useHistory();
  const token = window.sessionStorage.getItem("token");
  const [_usermanagement, setUserManagement] = useState([]);
  const [_storecount, setStoreCount] = useState();
  const [count, setCount] = useState(0);

  return (
    <Page title="Activity">
      <Box className={classes.mainbox}>
        <Box className={classes.devicelistHeading}>
          <Typography variant="h1" className="headingText">
            Activity Management
          </Typography>
        </Box>

        <Divider className={classes.divider} />

        <Box>
          {/* <Box style={{ margin: "25px 0px -15px" }} align="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                history.push({
                  pathname: "/activityView",
                  search: "Add",
                })
              }
            >
              Add
            </Button>
          </Box> */}
          {/* <ActivityTable /> */}
          <ActivityMainTable />
        </Box>
      </Box>
    </Page>
  );
}
