import React from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainbox: {
    "& h1": {
      fontSize: "50px",
      lineHeight: "56px",
      color: "#01FBB4",
      filter: "drop-shadow(0px 0px 10px #1EB808)",
      textShadow: "0px 0px 38px #1EB808",
      paddingTop: "30px",
    },

   
  },
  box: {
    padding: "15px",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(42px)",
    border: "1px solid #01FBB4",
    borderRadius: "5px",
    "&:hover": {
      boxShadow:
        "0 0 1rem #1eb80873, 0 0 0rem #1eb80873, 0 0 1rem #1eb80880, 0 0 4rem #1eb80866",
    },

    [theme.breakpoints.only("xs")]: {
      background: "#000",
    },

   
  },
  Featuring: {
    display: "flex",
    paddingTop: "50px",
    alignItems: "baseline",
   
  
  
  
  },
  top: {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
}));
export default function Bannner1({ data }) {
    const classes = useStyles();
  
    return (
      <Box className={classes.mainbox}>
        <Box className={classes.box}>
          <img src={data.image} alt="" style={{ width: "100%" }} />
  
        
        </Box>
      </Box>
    );
  }
