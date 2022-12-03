import { Typography, Box, Divider, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import Page from "src/component/Page";
import BarChartIcon from "@material-ui/icons/BarChart";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReorderIcon from "@material-ui/icons/Reorder";

import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import CategoryIcon from "@material-ui/icons/Category";

const useStyles = makeStyles((theme) => ({
  Featuring: {
    display: "flex",
    justifyContent: "start",
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

  mainbox: {
    border: "1px solid #01FBB4",
    padding: "35px",
    textAlign: "center",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgb(0 0 0 / 25%)",
    borderRadius: "5px",
    backdropFilter: "blur(42px)",
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },

    "& h2": {
      fontSize: "20px",
      fontFamily: "Dismedia",
    },
    "& h5": {
      fontSize: "20px",
      paddingTop: "10px",
    },
  },
  divider: {
    marginTop: "30px",
    // border: "1px solid #fff",
  },
}));
function Dashboard(data) {
  const classes = useStyles();
  return (
    <Page>
      <Box mt={7}>
        <Box className={classes.mainbox}>
          <Box>
            <Typography variant="h5" style={{ paddingBottom: "10px" }}>
              {data.data.title}
            </Typography>
            <Typography variant="h2">{data.data.amount}</Typography>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default Dashboard;
