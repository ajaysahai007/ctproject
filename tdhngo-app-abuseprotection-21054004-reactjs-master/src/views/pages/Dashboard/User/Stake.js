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

import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    padding: "30px 0",
    position: "relative",
    overflow: "hidden",
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
  const [tabview, setTabView] = useState("ViewStake");
  const history = useHistory();
  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.Featuring}>
        <img src="images/Vector 83.png" className="icon1" />
        <Typography variant="h1" className="headingText">
          Staked NFT's
        </Typography>
        <img src="images/Vector 80.png" className="icon2" />
      </Box>
      <Divider className={classes.divider} />
      <Box className="stakeButoon">
        <Box className="TabButtonsBox1">
          <Button
            className={tabview === "ViewStake" ? "active" : " "}
            onClick={() => setTabView("ViewStake")}
          >
            Shoes
          </Button>
         
        </Box>{" "}
        <Button
          variant="contained"
          color="secondary"

        >
          Back
        </Button>
      </Box>
      <Box className="TabButtonsContant">

      </Box>
    </Box>
  );
}
