import React, { useState } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import Information from "./Information";
import ListedNFT from "./ListedNFT";
import DashboardNft from "./DashboardNft";
import LogHistory from "./LogHistory";
import Running from "./Running";
import Cycling from "./Cycling";
import Walking from "./Walking";

const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "30px 0",
    position: "relative",
    overflow: "hidden",
  },
}));

export default function Dashboard(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabview, setTabView] = useState("My");

  return (
    <Box className={classes.bannerBox}>
      <Box className="TabButtonsBox1">
        <Button
          className={tabview === "My" ? "active" : " "}
          onClick={() => setTabView("My")}
        >
          Running
        </Button>
        <Button
          className={tabview === "Cycling" ? "active" : " "}
          onClick={() => setTabView("Cycling")}
        >
          Cycling
        </Button>
        <Button
          className={tabview === "Walking" ? "active" : " "}
          onClick={() => setTabView("Walking")}
        >
          Walking
        </Button>
      </Box>{" "}
      <Box className="TabButtonsContant">
        {tabview === "My" ? <Running /> : ""}
        {tabview === "Cycling" ? <Cycling /> : ""}
        {tabview === "Walking" ? <Walking /> : ""}
      </Box>
    </Box>
  );
}
