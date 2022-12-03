import React, { useState } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
  Divider,
} from "@material-ui/core";
import Information from "./Information";
import ListedNFT from "./ListedNFT";
import LogHistory from "./LogHistory";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    paddingTop: "23px",
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.only("xs")]: {
      padding: "10px 0",
    },
  },
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
  divider: {
    marginTop: "30px",
    // border: "1px solid #fff",
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabview, setTabView] = useState("My");

  return (
    <Box className={classes.bannerBox}>
      {/* <Container maxWidth="lg"> */}
      <Box className={classes.Featuring}>
        <img src="images/Vector 83.png" className="icon1" />
        <Typography variant="h1" className="headingText">
          User Detail View
        </Typography>
        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Box className="TabButtonsBox boxLine" mt={4}>
        <Button
          className={tabview === "My" ? "active" : " "}
          onClick={() => setTabView("My")}
        >
          General Information
        </Button>
        <Button
          className={tabview === "Unstake" ? "active" : " "}
          onClick={() => setTabView("Unstake")}
        >
          Owned NFT Informaiton
        </Button>
        <Button
          className={tabview === "Dashboard" ? "active" : " "}
          onClick={() => setTabView("Dashboard")}
        >
          Dashboard
        </Button>
        <Button
          className={tabview === "History" ? "active" : " "}
          onClick={() => setTabView("History")}
        >
          Log History
        </Button>
      </Box>{" "}
      <Box className="TabButtonsContant">
        {tabview === "My" ? <Information /> : ""}
        {tabview === "Unstake" ? <ListedNFT /> : ""}
        {tabview === "History" ? <LogHistory /> : ""}
      </Box>
    </Box>
  );
}
